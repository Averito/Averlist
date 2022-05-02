import { Express } from 'express'
import { v4 as uuidv4 } from 'uuid'

export const editFileName = (
	req: any,
	avatar: Express.Multer.File,
	callback: (error: Error, filename: string) => void
) => {
	const avatarName = `${uuidv4()}.${avatar.mimetype.split('/')[1]}`
	callback(null, avatarName)
}
