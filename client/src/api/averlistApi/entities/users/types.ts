import { Anime } from '@averlistApi/entities/anime/types'
import { Collection } from '@averlistApi/entities/collections/types'

export type Role = 'user' | 'admin'

export interface FavoriteCollection {
	collection: Collection
}

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
	anime_list?: Anime[]
	collections?: Collection[]
	favoriteCollections?: FavoriteCollection[]
	created_at: Date
	updated_at: Date
}

export interface Sizes {
	width: number
	height: number
}
