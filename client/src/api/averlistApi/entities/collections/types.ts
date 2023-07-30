import { User } from '@averlistApi/entities/users/types'
import { Anime } from '@averlistApi/entities/anime/types'
import { QueryObject } from 'anilibria-api-wrapper'

export enum CollectionType {
	PRIVATE = 'Приватно',
	PUBLIC = 'Публично'
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

export interface GetAllCollectionsQueries extends QueryObject {
	page: number
	pageSize: number
	search: string
}
