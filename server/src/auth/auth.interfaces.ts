import { User } from '@prisma/client'

export interface Login {
	accessToken: string
	refreshToken?: string
	userId: string
}

export type Tokens = Omit<Login, 'userId'>

export interface Registration {
	tokens: Tokens
	user: User
}
