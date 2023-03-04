import { User as UserInterface } from '@averlistApi/entities/users/types'
import {
	Collection as CollectionInterface,
	EditCollection as EditCollectionInterface,
	NewCollection as NewCollectionInterface
} from '@averlistApi/entities/collections/types'
import {
	Anime as AnimeInterface,
	NewAnime as NewAnimeInterface
} from '@averlistApi/entities/anime/types'
import { Invitation as InvitationInterface } from '@averlistApi/entities/invitations/types'
import { News as NewsInterface } from '@averlistApi/entities/news/types'
import {
	ChangePassword as ChangePasswordInterface,
	Login as LoginInterface,
	Registration as RegistrationInterface,
	ResetPassword as ResetPasswordInterface
} from '@averlistApi/entities/auth/types'

export namespace Averlist {
	export type User = UserInterface
	export type Collection = CollectionInterface
	export type NewCollection = NewCollectionInterface
	export type EditCollection = EditCollectionInterface
	export type Anime = AnimeInterface
	export type NewAnime = NewAnimeInterface
	export type Invitation = InvitationInterface
	export type News = NewsInterface
	export type Registration = RegistrationInterface
	export type Login = LoginInterface
	export type ChangePassword = ChangePasswordInterface
	export type ResetPassword = ResetPasswordInterface
	export enum CollectionType {
		PRIVATE = 'private',
		PUBLIC = 'public'
	}
	export enum AnimeStatus {
		VIEWED = 'Просмотрено',
		PLANNED = 'Запланировано',
		ABANDONED = 'Заброшено',
		COMING_OUT = 'Выходит',
		LOOK = 'Смотрю',
		RECONSIDERING = 'Пересматриваю'
	}
	export enum AnimeStatusQuery {
		ALL = 'all',
		VIEWED = 'viewed',
		PLANNED = 'planned',
		ABANDONED = 'abandoned',
		COMING_OUT = 'coming_out',
		LOOK = 'look',
		RECONSIDERING = 'reconsidering'
	}
}
