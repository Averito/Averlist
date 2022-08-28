import { unlink } from 'fs'
import path from 'path'

export const removePrevFile = async (
	folder: string,
	fileName: string
): Promise<boolean> => {
	const imagePath = path.resolve(
		__dirname,
		'..',
		'..',
		'..',
		'uploads',
		folder,
		fileName
	)

	let hasError = false
	await unlink(imagePath, error => {
		if (error) hasError = true
	})

	return hasError
}
