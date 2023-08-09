import { User as UserInterface } from '@averlistApi/entities/users/types'
import {
	Anime as AnimeInterface,
	NewAnime as NewAnimeInterface
} from '@averlistApi/entities/anime/types'
import {
	ChangePassword as ChangePasswordInterface,
	Login as LoginInterface,
	Registration as RegistrationInterface,
	ResetPassword as ResetPasswordInterface
} from '@averlistApi/entities/auth/types'

export namespace Averlist {
	export type User = UserInterface
	export type Anime = AnimeInterface
	export type NewAnime = NewAnimeInterface
	export type Registration = RegistrationInterface
	export type Login = LoginInterface
	export type ChangePassword = ChangePasswordInterface
	export type ResetPassword = ResetPasswordInterface
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
