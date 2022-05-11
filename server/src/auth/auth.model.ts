import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType('Auth')
export class Auth {
	@Field()
	accessToken: string

	@Field()
	refreshToken: string
}

@ObjectType('AuthWithUserId')
export class AuthUser extends Auth {
	@Field(() => Int)
	userId: number
}

@ObjectType('JwtPayload')
export class JwtPayloadModel {
	@Field(() => Int)
	id: number

	@Field()
	login: string

	@Field()
	email: string
}
