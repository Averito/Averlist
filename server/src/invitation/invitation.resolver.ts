import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Request } from 'express'

import { Invitation } from './invitation.model'
import { InvitationService } from './invitation.service'
import { JwtAuthGuard } from '../auth/guards/accessT.guard'
import { UserService } from '../user/user.service'
import { UserMe } from '../user/user.model'

@Resolver(() => Invitation)
@UseGuards(JwtAuthGuard)
export class InvitationResolver {
	constructor(
		private readonly invitationService: InvitationService,
		private readonly userService: UserService
	) {}

	@Query(() => UserMe)
	myInvitations(@Context() context: Request) {
		return this.userService.getMe(context.user['id'])
	}

	@Mutation(() => Invitation)
	sendInvitation(
		@Context() context: Request,
		@Args('toUserId') toUserId: number
	) {
		return this.invitationService.sendInvitation(context.user['id'], toUserId)
	}

	@Mutation(() => Invitation)
	removeInvitation(
		@Context() context: Request,
		@Args('toUserId') toUserId: number
	) {
		return this.invitationService.removeInvitation(context.user['id'], toUserId)
	}

	@Mutation(() => Invitation)
	acceptInvitation(@Args('invitationId') invitationId: number) {
		return this.invitationService.acceptInvitation(invitationId)
	}

	@Mutation(() => Invitation)
	declineInvitation(@Args('invitationId') invitationId: number) {
		return this.invitationService.declineInvitation(invitationId)
	}
}
