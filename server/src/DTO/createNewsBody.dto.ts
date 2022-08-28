import { ApiProperty } from '@nestjs/swagger'
import { Express } from 'express'

export class CreateNewsBodyDto {
	@ApiProperty({ name: 'title' })
	title: string

	@ApiProperty({ name: 'text' })
	text: string

	@ApiProperty({ name: 'image' })
	image: Express.Multer.File
}
