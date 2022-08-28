import { ApiProperty } from '@nestjs/swagger'

export class NewsDto {
	@ApiProperty({ name: 'id' })
	id: string

	@ApiProperty({ name: 'title' })
	title: string

	@ApiProperty({ name: 'text' })
	text: string

	@ApiProperty({ name: 'image' })
	image: string

	@ApiProperty({ name: 'created_at' })
	created_at: Date

	@ApiProperty({ name: 'updated_at' })
	updated_at: Date
}
