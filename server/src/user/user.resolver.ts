import { Context, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Request } from 'express'

import { User, UserMe } from './user.model'
import { UserService } from './user.service'
import { JwtAuthGuard } from '../auth/guards/accessT.guard'

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [User])
	@UseGuards(JwtAuthGuard)
	allUsers() {
		return this.userService.getAllUsers()
	}

	@Query(() => UserMe)
	@UseGuards(JwtAuthGuard)
	getMe(@Context() context: Request) {
		return this.userService.getMe(context.user['id'])
	}
}
