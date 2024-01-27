import { Anime } from '@averlistApi/entities/anime/types'

export type Role = 'user' | 'admin'

export interface User {
	id: string
	name: string
	email: string
	avatar: string
	role: Role
	anime_list?: Anime[]
	created_at: Date
	updated_at: Date
}

export interface Sizes {
	width: number
	height: number
}
