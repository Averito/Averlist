import { IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class NewsDto {
	@ApiProperty({
		required: false
	})
	picture: string

	@ApiProperty()
	@IsString()
	description: string

	@ApiProperty()
	@IsNumber()
	lastUpdate: number
}
