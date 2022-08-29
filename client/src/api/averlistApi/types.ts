import { User as UserInterface } from '@averlistApi/entities/users/types'
import {
	Collection as CollectionInterface,
	NewCollection as NewCollectionInterface,
	EditCollection as EditCollectionInterface
} from '@averlistApi/entities/collections/types'
import {
	Anime as AnimeInterface,
	NewAnime as NewAnimeInterface
} from '@averlistApi/entities/anime/types'
import { Invitation as InvitationInterface } from '@averlistApi/entities/invitations/types'
import { News as NewsInterface } from '@averlistApi/entities/news/types'
import {
	Registration as RegistrationInterface,
	Login as LoginInterface,
	ChangePassword as ChangePasswordInterface,
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
}
