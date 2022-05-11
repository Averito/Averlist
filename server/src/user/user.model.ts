import { Field, Int, ObjectType } from '@nestjs/graphql'

import { Anime } from '../anime/anime.model'
import { Invitation } from '../invitation/invitation.model'

@ObjectType()
export class User {
	@Field(() => Int)
	id: number

	@Field()
	login: string

	@Field()
	email: string

	@Field()
	password: string

	@Field()
	description: string

	@Field()
	avatar: string

	@Field(() => [Anime])
	animeList: Array<Anime>

	@Field(() => [User])
	friendList: Array<User>

	@Field()
	role: 'user' | 'admin'

	@Field(() => Boolean)
	isActive: boolean

	@Field()
	refreshTokenHash: string
}

@ObjectType()
export class UserMe extends User {
	@Field(() => [Invitation])
	meInvitations: Array<Invitation>

	@Field(() => [Invitation])
	myInvitations: Array<Invitation>
}
