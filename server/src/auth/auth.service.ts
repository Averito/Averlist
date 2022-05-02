import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtService } from '@nestjs/jwt'

import { UserDto } from '../user/DTO/user.dto'
import { User, UserDocument } from '../user/user.schema'
import { UserService } from '../user/user.service'
import {
	NOT_FOUND_USER_ERROR,
	UNVERIFY_TOKEN_ERROR,
	WRONG_PASSWORD,
	INCORRECT_OLD_PASSWORD_ERROR,
	NOT_FOUND_USER_ON_EMAIL_ERROR,
	USER_FOUND_ERROR
} from './auth.constants'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		private readonly JwtService: JwtService,
		private readonly userService: UserService
	) {}

	public async authUser(user: UserDocument) {
		const { _id: id, login, email, password, description, avatar } = user
		const dataForToken = {
			id,
			login,
			email,
			password,
			description,
			avatar
		}

		const access_token = await this.generateToken(dataForToken)

		return { access_token, userId: id }
	}
	public async validateUser(user: UserDto) {
		const hasUser = await this.userModel.findOne({ email: user.email })

		if (!hasUser) throw new BadRequestException(NOT_FOUND_USER_ERROR)

		const isValidPassword = await bcrypt.compare(
			user.password,
			hasUser.password
		)

		if (!isValidPassword) throw new BadRequestException(WRONG_PASSWORD)

		return hasUser
	}
	public async checkAuth(token: string) {
		const valid = this.JwtService.verify(token, {
			secret: process.env.JWT_KEY
		})

		if (!valid) throw new BadRequestException(UNVERIFY_TOKEN_ERROR)

		const user = jwt.decode(token) as { email: string }
		const hasUser = this.userModel.findOne({ email: user.email })
		if (!hasUser) throw new BadRequestException(NOT_FOUND_USER_ERROR)

		return valid
	}
	public async registrationUser(user: UserDto) {
		const { login, password, email, description, avatar } = user
		const hash = await this.hashPassword(password, 10)
		const hasUser = await this.userModel.findOne({ email })

		if (hasUser) throw new BadRequestException(USER_FOUND_ERROR)

		const newUser = new this.userModel({
			login,
			email,
			password: hash,
			description,
			avatar
		})
		return newUser.save()
	}
	public async forgotPassword(user: UserDto & { oldPassword: string }) {
		const { login, email, password, oldPassword } = user

		const hasUser = await this.userModel.findOne({ email, login })
		if (!hasUser) throw new BadRequestException(NOT_FOUND_USER_ON_EMAIL_ERROR)

		const validOldPassword = await bcrypt.compare(oldPassword, hasUser.password)
		if (!validOldPassword) {
			throw new BadRequestException(INCORRECT_OLD_PASSWORD_ERROR)
		}

		const passwordHash = await this.hashPassword(password, 10)
		user.password = passwordHash

		const userUpdated = await this.userModel.findOneAndUpdate({ email }, user)

		return userUpdated
	}
	private async generateToken(payload: UserDto) {
		return await this.JwtService.signAsync(payload)
	}
	private async hashPassword(enteredPassword: string, rounds: number) {
		const salt = await bcrypt.genSalt(rounds)
		const hash = await bcrypt.hash(enteredPassword, salt)

		return hash
	}
}
