import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import {
	INVITATION_WAS_FOUND_ERROR,
	INVITATION_NOT_FOUND_ERROR,
	FRIEND_WAS_FOUND_ERROR
} from './invitation.constants'
import { InvitationEntity } from './invitation.entity'
import { UserEntity } from '../user/user.entity'
import { uniqueFriendList } from '../helpers/uniqueFriendList'

@Injectable()
export class InvitationService {
	constructor(
		@InjectRepository(InvitationEntity)
		private readonly invitationRepository: Repository<InvitationEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	public async sendInvitation(meId: number, foreignIdStr: string | number) {
		const foreignId = +foreignIdStr

		const guardInvite = await this.invitationRepository.findOneBy({
			invitedUser: {
				id: foreignId
			},
			senderUser: {
				id: meId
			}
		})
		const meFriendList = await this.userRepository.findOne({
			relations: ['friendList'],
			where: {
				id: meId
			}
		})

		const friendContain = meFriendList.friendList.find(
			friend => (friend as UserEntity).id === foreignId
		)

		if (friendContain) throw new BadRequestException(FRIEND_WAS_FOUND_ERROR)
		if (guardInvite) throw new BadRequestException(INVITATION_WAS_FOUND_ERROR)

		const newInvitation = {
			invitedUser: foreignId,
			senderUser: meId
		}
		const createdInvitation = await this.invitationRepository.save(
			newInvitation
		)
		const savedInvitation = await this.invitationRepository.findOne({
			relations: ['senderUser', 'invitedUser'],
			where: {
				id: createdInvitation.id
			}
		})
		return savedInvitation
	}

	public async removeInvitation(meId: number, foreignIdStr: string | number) {
		const foreignId = +foreignIdStr
		const inviteForRemove = await this.invitationRepository.findOne({
			relations: ['invitedUser'],
			where: {
				invitedUser: {
					id: foreignId
				},
				senderUser: {
					id: meId
				}
			}
		})

		if (!inviteForRemove) {
			throw new BadRequestException(INVITATION_NOT_FOUND_ERROR)
		}

		await this.invitationRepository.remove(inviteForRemove)
		return inviteForRemove
	}

	public async acceptInvitation(invitationIdStr: string | number) {
		const invitationId = +invitationIdStr
		const currentInvitation = await this.invitationRepository.findOne({
			relations: ['senderUser', 'invitedUser'],
			where: {
				id: invitationId
			}
		})

		if (!currentInvitation) {
			throw new BadRequestException(INVITATION_NOT_FOUND_ERROR)
		}

		const senderUser = await this.userRepository.findOne({
			relations: ['friendList'],
			where: {
				id: (currentInvitation.senderUser as UserEntity).id
			}
		})
		const invitedUser = await this.userRepository.findOne({
			relations: ['friendList'],
			where: {
				id: (currentInvitation.invitedUser as UserEntity).id
			}
		})

		senderUser.friendList.push(invitedUser)
		senderUser.friendList = uniqueFriendList(
			senderUser.friendList as UserEntity[]
		)
		await this.userRepository.save(senderUser)

		invitedUser.friendList.push(senderUser)
		invitedUser.friendList = uniqueFriendList(
			invitedUser.friendList as UserEntity[]
		)
		await this.userRepository.save(invitedUser)

		const savedSenderUser = await this.userRepository.findOne({
			relations: ['friendList'],
			where: {
				id: senderUser.id
			}
		})
		const savedInvitedUser = await this.userRepository.findOne({
			relations: ['friendList'],
			where: {
				id: invitedUser.id
			}
		})

		await this.invitationRepository.remove(currentInvitation)

		return {
			invitedUser: savedInvitedUser,
			senderUser: savedSenderUser
		}
	}

	public async declineInvitation(invitationIdStr: string | number) {
		const invitationId = +invitationIdStr
		const invitation = await this.invitationRepository.findOne({
			relations: ['invitedUser'],
			where: {
				id: invitationId
			}
		})

		await this.invitationRepository.remove(invitation)
		return invitation
	}
}
