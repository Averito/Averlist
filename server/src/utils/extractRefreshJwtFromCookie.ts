import { Request } from 'express'

export const extractRefreshJwtFromCookie = (
	request: Request
): string | null => {
	const token: string | undefined = request?.cookies['refreshToken']

	if (!token) {
		return null
	}

	return token
}
