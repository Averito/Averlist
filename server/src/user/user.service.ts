import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Express } from 'express'

import { NOT_FOUND_USER_ON_ID_ERROR } from './user.constants'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	public async getAllUsers() {
		const users = await this.userRepository.find({
			relations: ['friendList', 'animeList']
		})

		return users
	}
	public async getFriendListByUserId(userId: number) {
		const user = await this.userRepository.findOne({
			relations: ['friendList'],
			where: {
				id: userId
			}
		})
		return user.friendList
	}
	public async getUserById(id: number) {
		const user = await this.userRepository.findOne({
			relations: ['animeList', 'friendList'],
			where: { id: +id }
		})
		if (!user) throw new BadRequestException(NOT_FOUND_USER_ON_ID_ERROR)

		return user
	}
	public async getMe(id: number) {
		const user = await this.userRepository.findOne({
			relations: [
				'friendList',
				'animeList',
				'meInvitations',
				'meInvitations.invitedUser',
				'meInvitations.senderUser',
				'myInvitations',
				'myInvitations.invitedUser',
				'myInvitations.senderUser'
			],
			where: { id }
		})
		return user
	}
	public async editDescriptionAndLogin(
		description: string,
		login: string,
		id: number
	) {
		const currentUser = await this.userRepository.findOneBy({ id })
		currentUser.description = description
		if (login) currentUser.login = login
		return await this.userRepository.save(currentUser)
	}
	public async uploadAvatar(avatar: Express.Multer.File, id: number) {
		const currentUser = await this.userRepository.findOneBy({ id })
		currentUser.avatar = avatar.filename
		return await this.userRepository.save(currentUser)
	}
	public async removeAvatar(id: number) {
		const currentUser = await this.userRepository.findOneBy({ id })
		currentUser.avatar = ''
		return await this.userRepository.save(currentUser)
	}
	public async removeFriend(myId: number, friendIdStr: string) {
		const friendId = +friendIdStr
		const me = await this.userRepository.findOne({
			relations: ['friendList'],
			where: {
				id: myId
			}
		})
		const friend = await this.userRepository.findOne({
			relations: ['friendList'],
			where: {
				id: friendId
			}
		})

		me.friendList = me.friendList.filter(
			(oldFriend: UserEntity) => oldFriend.id !== friendId
		)
		await this.userRepository.save(me)

		friend.friendList = friend.friendList.filter(
			(oldFriend: UserEntity) => oldFriend.id !== myId
		)
		await this.userRepository.save(friend)

		return { myId, friendId }
	}
}
