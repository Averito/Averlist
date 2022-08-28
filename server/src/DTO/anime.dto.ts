import { ApiProperty } from '@nestjs/swagger'
import { AnimeStatus } from '@enums/animeStatus.enum'
import { UserDto } from './user.dto'
import { CollectionDto } from './collection.dto'
import { Anime } from '@prisma/client'

export class AnimeDto implements Anime {
	@ApiProperty({ name: 'id', default: 'uuid' })
	id: string

	@ApiProperty({ name: 'name' })
	name: string

	@ApiProperty({ name: 'poster' })
	poster: string

	@ApiProperty({ name: 'status', enum: AnimeStatus })
	status: AnimeStatus

	@ApiProperty({
		name: 'aniuId',
		description: 'id that this anime has in the aniu database'
	})
	aniuId: string

	@ApiProperty({
		name: 'anilibriaId',
		description: 'id that this anime has in the anilibria database'
	})
	anilibriaId: number

	@ApiProperty({
		name: 'user',
		description: 'user who has this anime in the anime list'
	})
	user: UserDto

	@ApiProperty({ name: 'userId' })
	userId: string

	@ApiProperty({
		name: 'collection',
		description: 'The collection the anime is in'
	})
	collection?: CollectionDto

	@ApiProperty({ name: 'collectionId' })
	collectionId: string

	@ApiProperty({ name: 'created_at', default: 'DateTime' })
	created_at: Date

	@ApiProperty({ name: 'updated_at', default: 'DateTime' })
	updated_at: Date
}
