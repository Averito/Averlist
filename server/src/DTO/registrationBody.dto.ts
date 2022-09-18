import { ApiProperty } from '@nestjs/swagger'

export class RegistrationBodyDto {
	@ApiProperty({ name: 'login' })
	login: string

	@ApiProperty({ name: 'name' })
	name: string

	@ApiProperty({
		name: 'avatar',
		description: 'For not standard auth. Example: OAuth'
	})
	avatar?: string

	@ApiProperty({
		name: 'emailActive',
		description:
			'For not standard auth. WARNING: Password will generated and sent to email if emailActive is true'
	})
	emailActive?: boolean

	@ApiProperty({ name: 'email' })
	email: string

	@ApiProperty({ name: 'password' })
	password: string
}
