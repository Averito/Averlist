import { Request } from '@nestjs/common'
import { Express } from 'express'

export const imageFileFilter = (
	req: Request,
	file: Express.Multer.File,
	callback: any
) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return callback(new Error('Only image files are allowed!'), false)
	}
	callback(null, true)
}
