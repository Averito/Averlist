import { Field, Int, ObjectType, Float } from '@nestjs/graphql'

@ObjectType('News')
export class News {
	@Field(() => Int)
	id: number

	@Field()
	picture: string

	@Field()
	description: string

	@Field(() => Float)
	createdAt: number

	@Field(() => Float)
	lastUpdate: number
}
