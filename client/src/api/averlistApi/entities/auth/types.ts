import { User } from '@averlistApi/entities/users/types'

export interface Registration {
	login: string
	name: string
	email: string
	password: string
	avatar?: string
	emailActive?: boolean
	accessToken?: string
}

export interface Tokens {
	accessToken: string
	refreshToken: string
}

export interface RegistrationResponse {
	tokens: Tokens
	user: User
}

export interface Login {
	email: string
	password?: string
	accessToken?: string
}

export interface LoginResponse {
	accessToken: string
	refreshToken: string
	userId: string
}

export type AccessToken = Pick<Tokens, 'accessToken'>

export interface ResetPassword {
	email: string
}

export interface ChangePassword {
	newPassword: string
	oldPassword: string
}
