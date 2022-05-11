import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtService } from '@nestjs/jwt'

import { UserDto } from '../user/DTO/user.dto'
import { UserService } from '../user/user.service'
import {
	NOT_FOUND_USER_ERROR,
	UNVERIFY_TOKEN_ERROR,
	WRONG_PASSWORD,
	INCORRECT_OLD_PASSWORD_ERROR,
	NOT_FOUND_USER_ON_EMAIL_ERROR,
	USER_FOUND_ERROR, EXPIRED_TOKEN_ERROR, NOT_ACTIVATED_EMAIL
} from './auth.constants'
import { UserEntity } from '../user/user.entity'
import { randomUUID } from 'crypto'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
		private readonly mailerService: MailerService
	) {}

	public async authUser(user: UserEntity) {
		const { id, login, email, description, avatar, password } = user
		const tokenData: any = {
			id,
			login,
			email,
			password,
			description,
			avatar
		}

		const { accessToken, refreshToken } = await this.generateTokens(tokenData)
		await this.updateHashRefreshToken(id, refreshToken)

		return { accessToken, refreshToken, userId: id }
	}
	public async validateUser(user: UserDto) {
		const hasUser = await this.userRepository.findOneBy({ email: user.email })

		if (!hasUser) throw new BadRequestException(NOT_FOUND_USER_ERROR)

		const isValidPassword = await bcrypt.compare(
			user.password,
			hasUser.password
		)

		if (!isValidPassword) throw new BadRequestException(WRONG_PASSWORD)

		return hasUser
	}
	public async checkAuth(token: string) {
		const valid = this.jwtService.verify(token, {
			secret: process.env.JWT_KEY
		})

		if (!valid) throw new BadRequestException(UNVERIFY_TOKEN_ERROR)

		const user = jwt.decode(token) as { email: string }
		const hasUser = this.userRepository.findOneBy({ email: user.email })
		if (!hasUser) throw new BadRequestException(NOT_FOUND_USER_ERROR)

		return valid
	}
	public async createUser(user: UserDto) {
		const { login, password, email, description, avatar } = user
		const hash = await this.genHash(password, 10)
		const hasUser = await this.userRepository.findOneBy({ email })

		if (hasUser) throw new BadRequestException(USER_FOUND_ERROR)

		const newUser = {
			login,
			email,
			password: hash,
			description,
			avatar
		}

		const createdUser = await this.userRepository.save(newUser)

		this.sendEmailActivateMessage(createdUser.email, createdUser.activationLink)

		const { accessToken, refreshToken } = await this.generateTokens(newUser)
		await this.updateHashRefreshToken(createdUser.id, refreshToken)

		return { accessToken, refreshToken, userId: createdUser.id }
	}
	public async activateUser(activationLink: string) {
		const user = await this.userRepository.findOneBy({ activationLink })

		if (!user) throw new BadRequestException(NOT_FOUND_USER_ERROR)

		user.isActive = true
		await this.userRepository.save(user)
		return '<h1 style="font-family: Arial">Почта успешно подтверждена!</h1>'
	}
	public async logout(userId: number) {
		const user = await this.userRepository.findOneBy({ id: userId })
		user.refreshTokenHash = null
		return await this.userRepository.save(user)
	}
	public async restorePassword(email: string) {
		const user = await this.userRepository.findOneBy({ email })

		if (!user) throw new BadRequestException(NOT_FOUND_USER_ERROR)
		if (!user.isActive) throw new ForbiddenException(NOT_ACTIVATED_EMAIL)

		const newPassword = randomUUID()
		const newPasswordHash = await this.genHash(newPassword, 10)

		user.password = newPasswordHash
		await this.userRepository.save(user)

		this.sendNewPasswordMessage(email, newPassword)
	}
	public async refreshTokens(userId: number, refreshToken: string) {
		const user = await this.userRepository.findOneBy({ id: userId })

		if (!user) throw new BadRequestException(NOT_FOUND_USER_ERROR)

		const refreshTokenCompare = await bcrypt.compare(refreshToken, user.refreshTokenHash)

		if (!refreshTokenCompare) throw new ForbiddenException(EXPIRED_TOKEN_ERROR)

		const { id, login, email, description, avatar, password } = user
		const tokenData: any = {
			id,
			login,
			email,
			password,
			description,
			avatar
		}

		const { accessToken, refreshToken: rt } = await this.generateTokens(tokenData)
		await this.updateHashRefreshToken(id, rt)
		return { accessToken, refreshToken: rt }
	}
	public async updatePassword(user: UserDto & { oldPassword: string }) {
		const { login, email, password, oldPassword } = user

		const dbuser = await this.userRepository.findOneBy({ email, login })
		if (!dbuser) throw new BadRequestException(NOT_FOUND_USER_ON_EMAIL_ERROR)

		const validOldPassword = await bcrypt.compare(oldPassword, dbuser.password)
		if (!validOldPassword) {
			throw new BadRequestException(INCORRECT_OLD_PASSWORD_ERROR)
		}

		const passwordHash = await this.genHash(password, 10)
		dbuser.password = passwordHash

		return await this.userRepository.save(dbuser)
	}
	private sendEmailActivateMessage(to: string, link: string) {
		const formattedLink = `${process.env.API_URI}/activate/${link}`

		this.mailerService.sendMail({
			to,
			from: process.env.MAILER_FROM_EMAIL,
			subject: 'Подтверждение регистрации',
			text: 'Это сообщение было сгенерировано автоматически. Пожалуйста, не отвечайте на это сообщение.',
			html: `
				<div>
					<h2>Подтверждение почты на сайте ${process.env.MAILER_FROM_NAME}</h2>
					<p>Чтобы подтвердить почту перейдите по ссылке ниже:</p>
					<a href='${formattedLink}'>${formattedLink}</a>
				</div>
			`
		})
	}
	private sendNewPasswordMessage(to: string, newPassword: string) {
		this.mailerService.sendMail({
			to,
			from: process.env.MAILER_FROM_EMAIL,
			subject: 'Сброс пароля',
			text: 'Это сообщение было сгенерировано автоматически. Пожалуйста, не отвечайте на это сообщение.',
			html: `
				<div>
					<h2>Сброс пароля на сайте ${process.env.MAILER_FROM_NAME}</h2>
					<p>Ваш новый пароль: ${newPassword}</p>
				</div>
			`
		})
	}
	private async generateTokens(payload: any) {
		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: '1d',
			secret: process.env.JWT_ACCESS_SECRET
		})
		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: '30d',
			secret: process.env.JWT_REFRESH_SECRET
		})
		return { accessToken, refreshToken }
	}
	private async updateHashRefreshToken(userId: number, refreshToken: string) {
		const hash = await this.genHash(refreshToken, 15)
		const user = await this.userRepository.findOneBy({ id: userId })
		user.refreshTokenHash = hash
		return await this.userRepository.save(user)
	}
	private async genHash(value: string, rounds: number) {
		const salt = await bcrypt.genSalt(rounds)
		const hash = await bcrypt.hash(value, salt)

		return hash
	}
}
