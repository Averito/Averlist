import {
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Req,
	UseGuards
} from '@nestjs/common'

import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { InvitationService } from './invitation.service'
import { UserService } from '../user/user.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Invitation')
@UseGuards(JwtAuthGuard)
@Controller('invitation')
export class InvitationController {
	constructor(
		private readonly invitationService: InvitationService,
		private readonly userService: UserService
	) {}

	@Get()
	getAllMyInvitations(@Req() req) {
		return this.userService.getMe(req.user.id)
	}

	@Post(':userId')
	sendInvitation(@Req() req, @Param('userId') userId: string) {
		return this.invitationService.sendInvitation(req.user.id, userId)
	}

	@Delete(':userId')
	removeInvitation(@Req() req, @Param('userId') userId: string) {
		return this.invitationService.removeInvitation(req.user.id, userId)
	}

	@Get('accept/:invitationId')
	acceptInvitation(@Param('invitationId') invitationId: string) {
		return this.invitationService.acceptInvitation(invitationId)
	}

	@Delete('decline/:invitationId')
	declineInvitation(@Param('invitationId') invitationId: string) {
		return this.invitationService.declineInvitation(invitationId)
	}
}
