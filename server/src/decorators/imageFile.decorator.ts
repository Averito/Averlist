import { UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { editFileName } from '@utils/editFileName.util'
import { imageFileFilter } from '@utils/imageFileFilter.util'

export const ImageFile = (fieldName: string, destination: string) => {
	const maxSize = 1024 * 1024 * 3

	return UseInterceptors(
		FileInterceptor(fieldName, {
			storage: diskStorage({
				destination,
				filename: editFileName
			}),
			limits: { fileSize: maxSize },
			fileFilter: imageFileFilter
		})
	)
}
