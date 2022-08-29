import { User } from '@averlistApi/entities/users/types'
import { Collection } from '@averlistApi/entities/collections/types'

export enum AnimeStatus {
	VIEWED = 'Просмотрено',
	PLANNED = 'Запланировано',
	ABANDONED = 'Заброшено',
	COMING_OUT = 'Выходит',
	LOOK = 'Смотрю'
}

export interface Anime {
	id: string
	name: string
	poster?: string
	status: AnimeStatus
	aniuId?: string
	anilibriaId?: number
	user: User
	userId: string
	collection?: Collection
	collectionId?: string
	created_at: Date
	updated_at: Date
}

export interface NewAnime {
	name: string
	poster?: string
	status: AnimeStatus
	aniuId?: string
	anilibriaId?: number
}
