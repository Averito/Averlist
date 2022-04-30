import { Anime } from '../anime/types'
import { InvitationResponse } from '../invitation/types'

export interface User {
	_id?: string
	login?: string
	email: string
	password: string
	description?: string
	avatar?: string
	animeList?: Anime[]
	friendList?: User[]
	meInvitations?: InvitationResponse[]
	myInvitations?: InvitationResponse[]
}

export interface UserSafity {
	_id: string
	login: string
	email?: string
	password?: string
	description: string
	avatar: string
	animeList?: Anime[]
}

export type UserProperties = Partial<User>

export interface Login {
	access_token: string
	userId: string
}

export interface Token {
	id: string
	name: string
	email: string
}
