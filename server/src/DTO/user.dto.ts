import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@enums/role.enum'
import { InvitationDto } from './invitation.dto'
import { AnimeDto } from './anime.dto'
import { CollectionDto } from './collection.dto'
import { User } from '@prisma/client'

export class UserDto implements User {
	@ApiProperty({ name: 'id', default: 'uuid' })
	id: string

	@ApiProperty({ name: 'login' })
	login: string

	@ApiProperty({ name: 'name' })
	name: string

	@ApiProperty({ name: 'email', uniqueItems: true })
	email: string

	@ApiProperty({
		name: 'emailActive',
		description: 'Verified email or not',
		default: false
	})
	emailActive: boolean

	@ApiProperty({ name: 'avatar' })
	avatar: string

	@ApiProperty({ name: 'password_hash' })
	password: string

	@ApiProperty({ name: 'refreshTokenHash' })
	refreshTokenHash: string

	@ApiProperty({
		name: 'activate_link',
		description: 'link for email activate',
		default: 'uuid'
	})
	activate_link: string

	@ApiProperty({ name: 'role', enum: Role, default: Role.USER })
	role: Role

	@ApiProperty({
		name: 'friend_by',
		description: 'Users who have this user as friends'
	})
	friend_by: UserDto[]

	@ApiProperty({
		name: 'friend_with',
		description: 'Users with whom this user is friends'
	})
	friend_with: UserDto[]

	@ApiProperty({
		name: 'invitedBy',
		description: 'Received friend invitations'
	})
	invitedBy: InvitationDto[]

	@ApiProperty({ name: 'sender', description: 'Sent friend invitations' })
	sender: InvitationDto[]

	@ApiProperty({ name: 'anime_list' })
	anime_list: AnimeDto[]

	@ApiProperty({ name: 'collections' })
	collections: CollectionDto[]

	@ApiProperty({ name: 'created_at', default: 'DateTime' })
	created_at: Date

	@ApiProperty({ name: 'updated_at', default: 'DateTime' })
	updated_at: Date
}
