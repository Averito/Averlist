import { ApiProperty } from '@nestjs/swagger'
import { AnimeDto } from './anime.dto'
import { CollectionDto } from './collection.dto'
import { UserDto } from './user.dto'

export class GetAllUsersResponseDto {
	@ApiProperty({ name: 'id', default: 'uuid' })
	id: string

	@ApiProperty({ name: 'name' })
	name: string

	@ApiProperty({ name: 'avatar' })
	avatar?: string

	@ApiProperty({
		name: 'friend_with',
		description: 'Users with whom this user is friends'
	})
	friend_with: UserDto[]

	@ApiProperty({ name: 'anime_list' })
	anime_list: AnimeDto[]

	@ApiProperty({ name: 'collections' })
	collections: CollectionDto[]
}
