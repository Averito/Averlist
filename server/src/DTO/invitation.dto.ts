import { ApiProperty } from '@nestjs/swagger'
import { UserDto } from './user.dto'

export class InvitationDto {
	@ApiProperty({ name: 'id', default: 'uuid' })
	id: string

	@ApiProperty({
		name: 'senderUser',
		description: 'User who sent this invitation'
	})
	senderUser: UserDto

	@ApiProperty({ name: 'senderUserId' })
	senderUserId: string

	@ApiProperty({
		name: 'invitedUser',
		description: 'The user to whom this invitation was sent'
	})
	invitedUser: UserDto

	@ApiProperty({ name: 'invitedUserId' })
	invitedUserId: string

	@ApiProperty({ name: 'created_at', default: 'DateTime' })
	created_at: string

	@ApiProperty({ name: 'updated_at', default: 'DateTime' })
	updated_at: string
}
