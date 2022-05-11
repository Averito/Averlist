import { Field, Int, ObjectType } from '@nestjs/graphql'

import { User } from '../user/user.model'

@ObjectType('Anime')
export class Anime {
	@Field(() => Int)
	id: number

	@Field()
	name: string

	@Field(() => User)
	user: User

	@Field(() => Int)
	status: number

	@Field(() => Int)
	anilibriaTitleId: number
}
