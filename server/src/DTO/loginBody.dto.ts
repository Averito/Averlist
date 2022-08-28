import { ApiProperty } from '@nestjs/swagger'

export class LoginBodyDto {
	@ApiProperty({ name: 'email' })
	email: string

	@ApiProperty({ name: 'password' })
	password: string
}
