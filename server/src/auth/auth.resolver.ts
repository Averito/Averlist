import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Request } from 'express'

import { Auth, AuthUser, JwtPayloadModel } from './auth.model'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/accessT.guard'
import { User, UserMe } from '../user/user.model'
import { JwtRefreshAuthGuard } from './guards/refreshT.guard'

@Resolver(() => Auth)
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Query(() => AuthUser)
	async login(
		@Args('email') email: string,
		@Args('password') password: string
	) {
		const user = {
			email,
			password
		}
		const validateUser = await this.authService.validateUser(user)
		return this.authService.authUser(validateUser)
	}

	@Query(() => JwtPayloadModel)
	@UseGuards(JwtAuthGuard)
	checkAuth(@Context() context: Request) {
		return this.authService.checkAuth(context['authorizeToken'])
	}

	@Query(() => UserMe)
	@UseGuards(JwtAuthGuard)
	logout(@Context() context: Request) {
		return this.authService.logout(context.user['id'])
	}

	@Query(() => Auth)
	@UseGuards(JwtRefreshAuthGuard)
	refreshTokens(@Context() context: Request) {
		return this.authService.refreshTokens(
			context.user['id'],
			context['authorizeToken']
		)
	}

	@Query(() => User)
	restorePassword(@Args('email') email: string) {
		return this.authService.restorePassword(email)
	}

	@Mutation(() => AuthUser)
	registration(
		@Args('login') login: string,
		@Args('email') email: string,
		@Args('password') password: string
	) {
		const user = {
			login,
			email,
			password
		}
		return this.authService.createUser(user)
	}

	@Mutation(() => Auth)
	@UseGuards(JwtAuthGuard)
	updatePassword(
		@Args('login') login: string,
		@Args('email') email: string,
		@Args('password') password: string,
		@Args('oldPassword') oldPassword: string
	) {
		const user = {
			login,
			email,
			password,
			oldPassword
		}
		return this.authService.updatePassword(user)
	}
}
