import { BadRequestException, Injectable } from '@nestjs/common'
import { Invitation, User } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { INVITATION_FOUND, INVITATION_NOT_FOUND } from './invitation.constants'

@Injectable()
export class InvitationService {
	constructor(private readonly prisma: PrismaService) {}

	public async myInvitations(userId: string): Promise<Invitation[]> {
		return this.prisma.invitation.findMany({
			where: {
				senderUserId: userId
			},
			include: {
				invitedUser: true
			}
		})
	}
	public async meInvitations(userId: string): Promise<Invitation[]> {
		return this.prisma.invitation.findMany({
			where: {
				invitedUserId: userId
			},
			include: {
				senderUser: true
			}
		})
	}
	public async sendInvitation(
		invitedUserId: string,
		senderUserId: string
	): Promise<Invitation> {
		const invitation = await this.prisma.invitation.findMany({
			where: {
				invitedUserId,
				senderUserId
			}
		})
		if (invitation.length) throw new BadRequestException(INVITATION_FOUND)

		return this.prisma.invitation.create({
			data: {
				invitedUserId,
				senderUserId
			},
			include: {
				invitedUser: true
			}
		})
	}
	public async removeInvitation(invitationId: string): Promise<Invitation> {
		const invitation = await this.prisma.invitation.findUnique({
			where: { id: invitationId }
		})
		if (!invitation) throw new BadRequestException(INVITATION_NOT_FOUND)

		return this.prisma.invitation.delete({
			where: {
				id: invitationId
			}
		})
	}
	public async acceptInvitation(
		invitationId: string,
		userId: string
	): Promise<User> {
		const invitation = await this.prisma.invitation.findUnique({
			where: { id: invitationId }
		})
		if (!invitation) throw new BadRequestException(INVITATION_NOT_FOUND)

		await this.prisma.userFriendList.create({
			data: {
				senderUserId: invitation.senderUserId,
				invitedUserId: invitation.invitedUserId
			}
		})

		await this.prisma.invitation.delete({
			where: {
				id: invitationId
			}
		})

		return await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			include: {
				friend_with: true,
				invitedBy: true,
				senderTo: true
			}
		})
	}
}
