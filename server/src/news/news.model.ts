import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType('News')
export class News {
	@Field(() => Int)
	id: number

	@Field()
	picture: string

	@Field()
	description: string

	@Field(() => Int)
	createdAt: number

	@Field(() => Int)
	lastUpdate: number
}
