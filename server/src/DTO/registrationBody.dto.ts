import { ApiProperty } from '@nestjs/swagger'

export class RegistrationBodyDto {
	@ApiProperty({ name: 'login' })
	login: string

	@ApiProperty({ name: 'name' })
	name: string

	@ApiProperty({ name: 'email' })
	email: string

	@ApiProperty({ name: 'password' })
	password: string
}
