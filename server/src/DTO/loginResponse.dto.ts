import { ApiProperty } from '@nestjs/swagger'

export class LoginResponseDto {
	@ApiProperty({ name: 'accessToken' })
	accessToken: string

	@ApiProperty({ name: 'refreshToken' })
	refreshToken?: string

	@ApiProperty({
		name: 'userId',
		description: 'id of the user who was logged in'
	})
	userId: string
}
