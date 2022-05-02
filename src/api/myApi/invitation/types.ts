import { User } from '../auth/types'

export interface InvitationWithUsers {
	_id: string
	status: boolean
	senderUser: User[]
	invitedUser: User[]
}

export interface NormalInvitation {
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

export interface AcceptInvitationResponse {
	senderUser: User
	invitedUser: User
}
