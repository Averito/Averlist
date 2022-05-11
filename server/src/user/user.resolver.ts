import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Request } from 'express'

import { User, UserMe } from './user.model'
import { UserService } from './user.service'
import { JwtAuthGuard } from '../auth/guards/accessT.guard'

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [User])
	allUsers() {
		return this.userService.getAllUsers()
	}

	@Query(() => UserMe)
	me(@Context() context: Request) {
		return this.userService.getMe(context.user['id'])
	}

	@Query(() => User)
	userById(@Args('id') id: number) {
		return this.userService.getUserById(id)
	}

	@Mutation(() => User)
	meEdit(
		@Args('login') login: string,
		@Args('description') description: string,
		@Context() context: Request
	) {
		return this.userService.editDescriptionAndLogin(
			description,
			login,
			context.user['id']
		)
	}

	@Mutation(() => User)
	removeMyFriend(
		@Context() context: Request,
		@Args('friendId') friendId: number
	) {
		return this.userService.removeFriend(context.user['id'], friendId)
	}
}
