import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { User } from '@prisma/client'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { compare, genSalt, hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { PrismaService } from '../prisma.service'
import {
	ACTIVATE_LINK_NOT_VALID,
	PASSWORD_WRONG,
	REFRESH_TOKEN_WRONG,
	USER_NOT_FOUND,
	USER_WAS_FOUND,
	USER_WITH_THIS_ID_NOT_FOUND,
	WRONG_EMAIL_FORMAT
} from './auth.constants'
import { JwtPayload } from '@interfaces/jwtPayload.interface'
import { Login, Registration } from './auth.interfaces'
import { RegistrationBodyDto } from '@DTO/registrationBody.dto'
import { LoginBodyDto } from '@DTO/loginBody.dto'
import { isValidEmail } from '@helpers/isValidEmail'

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly mailerService: MailerService
	) {}

	public async registration(
		registrationBody: RegistrationBodyDto
	): Promise<Registration> {
		const hasUser = await this.prisma.user.findUnique({
			where: { email: registrationBody.email }
		})

		if (!isValidEmail(registrationBody.email))
			throw new BadRequestException(WRONG_EMAIL_FORMAT)
		if (hasUser || !registrationBody.email)
			throw new BadRequestException(USER_WAS_FOUND)

		let hashPassword
		if (!registrationBody.password) {
			const password = uuidv4()
			hashPassword = await this.genHash(password)
			this.sendMailWithPassword(registrationBody.email, password)
		} else {
			hashPassword = await this.genHash(registrationBody.password)
		}

		const activateLink = uuidv4()
		const activateLinkHash = await this.genHash(activateLink)

		const createdUser = await this.prisma.user.create({
			data: {
				login: registrationBody.login,
				name: registrationBody.name,
				avatar: registrationBody.avatar,
				email: registrationBody.email,
				emailActive: !!registrationBody.emailActive,
				activate_link: activateLinkHash,
				password: hashPassword
			}
		})

		const jwtPayload: JwtPayload = {
			userId: createdUser.id,
			role: 'user'
		}
		const accessToken = await this.genAccessToken(jwtPayload)
		const refreshToken = await this.genRefreshToken(jwtPayload)

		await this.setCurrentRefreshToken(refreshToken, createdUser.id)

		if (!registrationBody.emailActive) {
			this.sendMailForActivate(createdUser.email, activateLink, createdUser.id)
		}

		return {
			user: createdUser,
			tokens: {
				accessToken,
				refreshToken
			}
		}
	}
	public async login(loginBody: LoginBodyDto): Promise<Login> {
		const user = await this.validateUser(loginBody)

		const jwtPayload: JwtPayload = {
			userId: user.id,
			role: user.role
		}
		const accessToken = await this.genAccessToken(jwtPayload)

		const refreshToken = await this.genRefreshToken(jwtPayload)
		await this.setCurrentRefreshToken(refreshToken, user.id)

		return {
			refreshToken,
			accessToken,
			userId: user.id
		}
	}
	public async getAccessTokenFromRefreshToken(
		refreshToken: string
	): Promise<Pick<Login, 'accessToken'>> {
		const { userId } = (await this.jwtService.decode(
			refreshToken
		)) as JwtPayload

		const user = await this.prisma.user.findUnique({ where: { id: userId } })
		if (!user) throw new BadRequestException(USER_WITH_THIS_ID_NOT_FOUND)

		const isValidRefreshToken = compare(refreshToken, user.refreshTokenHash)
		if (!isValidRefreshToken)
			throw new UnauthorizedException(REFRESH_TOKEN_WRONG)

		await this.jwtService.verifyAsync(
			refreshToken,
			this.getRefreshTokenOptions()
		)

		const jwtPayload: JwtPayload = {
			userId: user.id,
			role: user.role
		}
		return {
			accessToken: await this.genAccessToken(jwtPayload)
		}
	}
	public async removeCurrentRefreshToken(userId: string): Promise<User> {
		return this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				refreshTokenHash: null
			}
		})
	}
	public async emailActivate(
		activateLink: string,
		userId: string
	): Promise<string> {
		const user = await this.prisma.user.findUnique({ where: { id: userId } })

		const isValidActivateLink = await compare(activateLink, user.activate_link)
		if (!isValidActivateLink)
			throw new BadRequestException(ACTIVATE_LINK_NOT_VALID)

		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				emailActive: true
			}
		})

		return '<h1 style="font-family: Arial, sans-serif">Почта успешно активирована, можете закрыть данную страницу</h1>'
	}
	public async resetPassword(email: string): Promise<User> {
		const user = await this.prisma.user.findUnique({ where: { email } })
		if (!user) throw new BadRequestException(USER_NOT_FOUND)

		const newPassword = uuidv4()
		this.sendMailForResetPassword(email, newPassword)

		const newPasswordHash = await this.genHash(newPassword)

		return this.prisma.user.update({
			where: {
				email
			},
			data: {
				password: newPasswordHash
			}
		})
	}
	public async changePassword(
		userId: string,
		oldPassword: string,
		newPassword: string
	): Promise<User> {
		const user = await this.prisma.user.findUnique({ where: { id: userId } })

		const isValidPassword = await compare(oldPassword, user.password)
		if (!isValidPassword) throw new BadRequestException(PASSWORD_WRONG)

		const newPasswordHash = await this.genHash(newPassword)

		return this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				password: newPasswordHash
			}
		})
	}

	private async setCurrentRefreshToken(
		refreshToken: string,
		userId: string
	): Promise<User> {
		const refreshTokenHash = await this.genHash(refreshToken)

		return this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				refreshTokenHash
			}
		})
	}
	private async validateUser(loginBody: LoginBodyDto): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { email: loginBody.email }
		})
		if (!user) throw new BadRequestException(USER_NOT_FOUND)

		const isValidPassword = await compare(
			loginBody?.password ? loginBody.password : '',
			user.password
		)
		if (!isValidPassword) throw new BadRequestException(PASSWORD_WRONG)

		return user
	}
	private async genRefreshToken(payload: JwtPayload): Promise<string> {
		return this.jwtService.signAsync(payload, this.getRefreshTokenOptions())
	}
	private async genAccessToken(payload: JwtPayload): Promise<string> {
		return this.jwtService.signAsync(payload, this.getAccessTokenOptions())
	}
	private getRefreshTokenOptions(): JwtSignOptions {
		return {
			secret: this.configService.get('REFRESH_JWT_SECRET'),
			expiresIn: this.configService.get('REFRESH_EXP_JWT')
		}
	}
	private getAccessTokenOptions(): JwtSignOptions {
		return {
			secret: this.configService.get('ACCESS_JWT_SECRET'),
			expiresIn: this.configService.get('ACCESS_EXP_JWT')
		}
	}
	private async genHash(enteredData: string, rounds = 10): Promise<string> {
		const salt = await genSalt(rounds)
		return hash(enteredData, salt)
	}
	private async sendMailForActivate(
		to: string,
		activateLink: string,
		userId: string
	) {
		try {
			const uri =
				process.env.MODE === 'development'
					? process.env.LOCALHOST_URI
					: process.env.AVERLIST_URI

			await this.mailerService.sendMail({
				to,
				from: process.env.MAILER_FROM,
				subject: 'Averlist',
				text: 'Активируйте свою почту',
				html: `<div>
					<h1>Активация электронной почты на Averlist</h1>
					<p>Для активации перейдите по ссылке: ${uri}/auth/activate/${activateLink}?userId=${userId}</p>
				</div>`
			})
		} catch (err) {
			console.log(err)
		}
	}
	private async sendMailForResetPassword(to: string, newPassword: string) {
		try {
			await this.mailerService.sendMail({
				to,
				from: process.env.MAILER_FROM,
				subject: 'Averlist',
				text: 'Сброс пароля',
				html: `<div>
					<h1>Сброс пароля на Averlist</h1>
					<p>Ваш новый пароль: ${newPassword}</p>
					<strong>Не забудьте его сменить!</strong>
				</div>`
			})
		} catch (err) {
			console.log(err)
		}
	}
	private async sendMailWithPassword(to: string, password: string) {
		try {
			await this.mailerService.sendMail({
				to,
				from: process.env.MAILER_FROM,
				subject: 'Averlist',
				text: 'Ваш пароль',
				html: `<div>
					<h1>Ваш пароль на Averlist</h1>
					<p>Ваш пароль: ${password}</p>
					<strong>Не забудьте его сменить! Или оставьте такой, он вполне надёжный ;)</strong>
				</div>`
			})
		} catch (err) {
			console.log(err)
		}
	}
}
