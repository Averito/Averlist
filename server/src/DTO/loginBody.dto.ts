import { ApiProperty } from '@nestjs/swagger'

export class LoginBodyDto {
	@ApiProperty({ name: 'email' })
	email: string

	@ApiProperty({ name: 'password' })
	password?: string

	@ApiProperty({
		name: 'accessToken',
		description: 'From other services. Example: Discord access token.'
	})
	accessToken?: string
}
