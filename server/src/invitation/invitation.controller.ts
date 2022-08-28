import { Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { User, Invitation } from '@prisma/client'
import { Auth } from '@decorators/auth.decorator'
import { InvitationService } from './invitation.service'
import { CurrentUser } from '@decorators/user.decorator'
import { InvitationDto } from '@DTO/invitation.dto'
import { UserDto } from '@DTO/user.dto'

@Controller('invitation')
@Auth()
@ApiTags('Invitation')
export class InvitationController {
	constructor(private readonly invitationService: InvitationService) {}

	@Get('my')
	@ApiOkResponse({ type: [InvitationDto] })
	async myInvitations(@CurrentUser() user: User): Promise<Invitation[]> {
		return this.invitationService.myInvitations(user.id)
	}

	@Get('me')
	@ApiOkResponse({ type: [InvitationDto] })
	async meInvitations(@CurrentUser() user: User): Promise<Invitation[]> {
		return this.invitationService.meInvitations(user.id)
	}

	@Post('send/:invitedUserId')
	@ApiOkResponse({ type: InvitationDto })
	async sendInvitation(
		@Param('invitedUserId') invitedUserId: string,
		@CurrentUser() user: User
	): Promise<Invitation> {
		return this.invitationService.sendInvitation(invitedUserId, user.id)
	}

	@Post('accept/:invitationId')
	@ApiOkResponse({ type: UserDto })
	async acceptInvitation(
		@Param('invitationId') invitationId: string,
		@CurrentUser() user: User
	): Promise<User> {
		return this.invitationService.acceptInvitation(invitationId, user.id)
	}

	@Delete(':invitationId')
	@ApiOkResponse({ type: InvitationDto })
	async removeInvitation(
		@Param('invitationId') invitationId: string
	): Promise<Invitation> {
		return this.invitationService.removeInvitation(invitationId)
	}
}
