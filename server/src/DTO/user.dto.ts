import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@enums/role.enum'
import { AnimeDto } from './anime.dto'

export class UserDto {
	@ApiProperty({ name: 'id', default: 'uuid' })
	id: string

	@ApiProperty({ name: 'name' })
	name: string

	@ApiProperty({ name: 'email', uniqueItems: true })
	email: string

	@ApiProperty({ name: 'avatar' })
	avatar: string

	@ApiProperty({ name: 'role', enum: Role, default: Role.USER })
	role: Role

	@ApiProperty({ name: 'anime_list' })
	anime_list: AnimeDto[]

	@ApiProperty({ name: 'created_at', default: 'DateTime' })
	created_at: Date

	@ApiProperty({ name: 'updated_at', default: 'DateTime' })
	updated_at: Date
}
