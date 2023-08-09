import { Anime } from '@averlistApi/entities/anime/types'

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
	anime_list?: Anime[]
	created_at: Date
	updated_at: Date
}

export interface Sizes {
	width: number
	height: number
}
