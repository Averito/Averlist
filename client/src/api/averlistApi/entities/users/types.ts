import { Invitation } from '@averlistApi/entities/invitations/types'
import { Anime } from '@averlistApi/entities/anime/types'
import { Collection } from '@averlistApi/entities/collections/types'

export type Role = 'user' | 'admin'

export interface User {
	id: string
	login: string
	name: string
	email: string
	emailActive: boolean
	avatar: string
	password: string
	refreshTokenHash: string
	activate_link: string
	role: Role
	friend_by: User[]
	friend_with: User[]
	invitedBy: Invitation[]
	senderTo: Invitation[]
	anime_list?: Anime[]
	collections?: Collection[]
	favoriteCollections?: Collection[]
	created_at: Date
	updated_at: Date
}
