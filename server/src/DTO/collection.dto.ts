import { ApiProperty } from '@nestjs/swagger'
import { CollectionType } from '@enums/collectionType.enum'
import { AnimeDto } from './anime.dto'
import { UserDto } from './user.dto'

export class CollectionDto {
	@ApiProperty({ name: 'id', default: 'uuid' })
	id: string

	@ApiProperty({ name: 'name' })
	name: string

	@ApiProperty({ name: 'poster' })
	poster: string

	@ApiProperty({ name: 'type', enum: CollectionType })
	type: CollectionType

	@ApiProperty({
		name: 'anime_list',
		description: 'List of anime in this collection'
	})
	anime_list: AnimeDto[]

	@ApiProperty({
		name: 'user',
		description: 'The user who owns this collection'
	})
	user: UserDto

	@ApiProperty({ name: 'userId' })
	userId: string

	@ApiProperty({ name: 'created_at', default: 'DateTime' })
	created_at: string

	@ApiProperty({ name: 'updated_at', default: 'DateTime' })
	updated_at: string
}
