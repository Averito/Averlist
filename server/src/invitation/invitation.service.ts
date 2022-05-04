import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User, UserDocument } from '../user/user.schema'
import { Invitation, InvitationDocument } from './invitation.schema'
import {
	INVITATION_WAS_FOUND_ERROR,
	INVITATION_NOT_FOUND_ERROR,
	FRIEND_WAS_FOUND_ERROR
} from './invitation.constants'
import { uniqueCheck } from '../helpers/uniqueCheck'

@Injectable()
export class InvitationService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		@InjectModel(Invitation.name)
		private readonly invitationModel: Model<InvitationDocument>
	) {}

	public async sendInvitation(meId: string, foreignId: string) {
		// todo: PostgreSQL
		const guardInvite = await this.invitationModel.findOne({
			invitedUser: foreignId,
			senderUser: meId
		})
		const friendContain = await this.userModel.findOne({
			_id: meId,
			friendList: {
				$all: [foreignId]
			}
		})

		if (friendContain) throw new BadRequestException(FRIEND_WAS_FOUND_ERROR)
		if (guardInvite) throw new BadRequestException(INVITATION_WAS_FOUND_ERROR)

		const newInvitation = {
			status: false,
			invitedUser: foreignId,
			senderUser: meId
		}
		const createdInvitation = new this.invitationModel(newInvitation)
		const savedCreatedInvitation = await createdInvitation.save()
		const savedInvitation = this.invitationModel
			.findById(savedCreatedInvitation._id)
			.populate('invitedUser')
			.populate('senderUser')
		return savedInvitation
	}
	public async removeInvitation(meId: string, foreignId: string) {
		// todo: PostgreSQL
		const inviteForRemove = await this.invitationModel.findOne({
			invitedUser: foreignId,
			senderUser: meId
		})

		if (!inviteForRemove) {
			throw new BadRequestException(INVITATION_NOT_FOUND_ERROR)
		}

		return await this.invitationModel.deleteOne({
			invitedUser: foreignId,
			senderUser: meId
		})
	}
	public async acceptInvitation(invitationId: string) {
		// todo: PostgreSQL
		const currentInvitation = await this.invitationModel.findById(invitationId)

		if (!currentInvitation) {
			throw new BadRequestException(INVITATION_NOT_FOUND_ERROR)
		}

		let senderUser = await this.userModel.findById(currentInvitation.senderUser)
		let invitedUser = await this.userModel.findById(
			currentInvitation.invitedUser
		)

		senderUser.friendList.push(invitedUser._id)
		senderUser.friendList = uniqueCheck(senderUser.friendList)
		await senderUser.save()

		invitedUser.friendList.push(senderUser._id)
		invitedUser.friendList = uniqueCheck(invitedUser.friendList)
		await invitedUser.save()

		senderUser = await this.userModel
			.findById(currentInvitation.senderUser)
			.populate('friendList')
		invitedUser = await this.userModel
			.findById(currentInvitation.invitedUser)
			.populate('friendList')

		await this.invitationModel.findByIdAndDelete(invitationId)

		return {
			senderUser,
			invitedUser
		}
	}
	public async declineInvitation(invitationId: string) {
		// todo: PostgreSQL
		return await this.invitationModel.findByIdAndDelete(invitationId)
	}
}
