import { ApiProperty } from '@nestjs/swagger'
import { AnimeDto } from './anime.dto'

export class GetAllUsersResponseDto {
	@ApiProperty({ name: 'id', default: 'uuid' })
	id: string

	@ApiProperty({ name: 'name' })
	name: string

	@ApiProperty({ name: 'avatar' })
	avatar?: string

	@ApiProperty({ name: 'anime_list' })
	anime_list: AnimeDto[]
}
