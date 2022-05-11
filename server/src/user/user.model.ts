import { Field, Int, ObjectType } from '@nestjs/graphql'

import { Anime } from '../anime/anime.model'
import { Invitation } from '../invitation/invitation.model'

@ObjectType('User')
export class User {
	@Field(() => Int)
	id: number

	@Field()
	login: string

	@Field()
	description: string

	@Field()
	avatar: string

	@Field(() => [Anime])
	animeList: Array<Anime>

	@Field(() => [User])
	friendList: Array<User>
}

@ObjectType()
export class UserMe extends User {
	@Field()
	email: string

	@Field()
	password: string

	@Field()
	role: 'user' | 'admin'

	@Field(() => Boolean)
	isActive: boolean

	@Field({ nullable: true })
	refreshTokenHash: string

	@Field(() => [Invitation])
	meInvitations: Array<Invitation>

	@Field(() => [Invitation])
	myInvitations: Array<Invitation>
}
