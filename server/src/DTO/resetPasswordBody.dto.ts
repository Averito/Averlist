import { ApiProperty } from '@nestjs/swagger'

export class ResetPasswordBodyDto {
	@ApiProperty({ name: 'email' })
	email: string
}
