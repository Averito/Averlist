import { User } from '@averlistApi/entities/users/types'
import { Anime } from '@averlistApi/entities/anime/types'

export enum CollectionType {
	PRIVATE = 'private',
	PUBLIC = 'public'
}

export interface Collection {
	id: string
	name: string
	poster: string
	type: CollectionType
	anime_list: {
		anime: Anime
	}[]
	createdBy: User
	createdById: string
	favoritesBy?: User[]
	created_at: Date
	updated_at: Date
}

export interface NewCollection {
	poster: File
	name: string
	type: CollectionType
	anime_list: string
}

export interface EditCollection {
	name?: string
	type?: CollectionType
}
