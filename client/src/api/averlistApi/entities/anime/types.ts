import { User } from '@averlistApi/entities/users/types'
import { Collection } from '@averlistApi/entities/collections/types'

export enum AnimeStatus {
	VIEWED = 'Просмотрено',
	PLANNED = 'Запланировано',
	ABANDONED = 'Заброшено',
	COMING_OUT = 'Выходит',
	LOOK = 'Смотрю',
	RECONSIDERING = 'Пересматриваю'
}

export interface Anime {
	id: string
	name: string
	poster?: string
	status: AnimeStatus
	aniuId?: string
	anilibriaId?: number
	anilibriaCode?: string
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
	anilibriaCode?: string
}
