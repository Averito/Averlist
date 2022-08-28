import { v4 as uuidv4 } from 'uuid'

export const editFileName = (req, file, callback) => {
	const splitFileName = file.originalname.split('.')

	const name = splitFileName[0]
	const fileExtName = splitFileName[1]
	const randomName = uuidv4()

	callback(null, `${name}-${randomName}.${fileExtName}`)
}
