import { Request } from 'express'

export const extractAccessJwtFromCookie = (request: Request): string | null => {
	const token: string | undefined = request?.cookies['accessToken']

	if (!token) {
		return null
	}

	return token
}
