import { ApiProperty } from '@nestjs/swagger'
import { TokensDto } from './tokens.dto'
import { UserDto } from '@DTO/user.dto'

export class RegistrationResponseDto {
	@ApiProperty({ name: 'tokens' })
	tokens: TokensDto

	@ApiProperty({ name: 'user', description: 'Newly created user' })
	user: UserDto
}
