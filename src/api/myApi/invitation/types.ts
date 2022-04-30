import { User } from '../auth/types'

export interface InvitationResponse {
	_id: string
	status: boolean
	senderUser: User
	invitedUser: User
}

export interface Invitation {
	_id?: string
	status: boolean
	senderUser: string
	invitedUser: string
}
