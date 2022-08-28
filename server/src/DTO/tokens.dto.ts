import { ApiProperty } from '@nestjs/swagger'

export class TokensDto {
	@ApiProperty({ name: 'accessToken' })
	accessToken: string

	@ApiProperty({ name: 'refreshToken' })
	refreshToken?: string
}
