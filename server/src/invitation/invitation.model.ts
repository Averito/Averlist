import { Field, Int, ObjectType } from '@nestjs/graphql'

import { User } from '../user/user.model'

@ObjectType()
export class Invitation {
	@Field(() => Int)
	id: number

	@Field(() => User)
	invitedUser: User

	@Field(() => User)
	senderUser: User
}
