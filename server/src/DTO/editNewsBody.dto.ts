import { ApiProperty } from '@nestjs/swagger'

export class EditNewsBodyDto {
	@ApiProperty({ name: 'title' })
	title?: string

	@ApiProperty({ name: 'text' })
	text?: string
}
