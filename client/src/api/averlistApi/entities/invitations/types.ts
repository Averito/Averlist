import { User } from '@averlistApi/entities/users/types'

export interface Invitation {
	id: string
	senderUser: User
	senderUserId: string
	invitedUser: User
	invitedUserId: string
	created_at: Date
	updated_at: Date
}
