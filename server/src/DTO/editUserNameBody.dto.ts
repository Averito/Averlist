import { ApiProperty } from '@nestjs/swagger'

export class EditUserNameBodyDto {
	@ApiProperty({ name: 'name' })
	name: string
}
