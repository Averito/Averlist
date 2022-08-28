import { BadRequestException, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { GetAllUsersType } from '../types/getAllUsers.type'
import { removePrevFile } from '@utils/removePrevFile.util'
import { FRIEND_NOT_FOUND, LARGE_LIMIT, maxLimit } from './user.constants'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	public async getAllForAdmin(): Promise<User[]> {
		return this.prisma.user.findMany({
			include: {
				friend_with: true,
				anime_list: true,
				collections: true
			}
		})
	}
	public async getAll(
		limit: number,
		currentPage: number
	): Promise<GetAllUsersType[]> {
		if (limit > maxLimit) throw new BadRequestException(LARGE_LIMIT)

		return this.prisma.user.findMany({
			select: {
				id: true,
				name: true,
				avatar: true,
				anime_list: true,
				friend_with: true,
				collections: true
			},
			take: limit,
			skip: (currentPage - 1) * limit
		})
	}
	public async getMe(userId: string) {
		return this.prisma.user.findUnique({
			where: {
				id: userId
			},
			include: {
				anime_list: {
					orderBy: [
						{
							name: 'asc'
						}
					]
				},
				collections: true,
				friend_with: true,
				friend_by: true,
				invitedBy: true,
				senderTo: true
			}
		})
	}
	public async editName(userId: string, name: string): Promise<User> {
		return await this.prisma.user.update({
			where: { id: userId },
			data: {
				name
			}
		})
	}
	public async setAvatar(
		avatar: Express.Multer.File,
		userId: string
	): Promise<User> {
		const user = await this.prisma.user.findUnique({ where: { id: userId } })

		if (user.avatar) await removePrevFile('avatars', user.avatar)

		return await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				avatar: avatar.filename
			}
		})
	}
	public async removeUserById(userId: string): Promise<User> {
		return this.prisma.user.delete({ where: { id: userId } })
	}
	public async removeFriend(friendId: string, meId: string): Promise<User> {
		const hasFriend = await this.prisma.userFriendList.findUnique({
			where: {
				senderUserId_invitedUserId: {
					senderUserId: meId,
					invitedUserId: friendId
				}
			}
		})
		if (!hasFriend) throw new BadRequestException(FRIEND_NOT_FOUND)

		await this.prisma.userFriendList.delete({
			where: {
				senderUserId_invitedUserId: {
					senderUserId: meId,
					invitedUserId: friendId
				}
			}
		})

		return this.prisma.user.findUnique({
			where: {
				id: friendId
			}
		})
	}
}
