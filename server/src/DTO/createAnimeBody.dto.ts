import { ApiProperty } from '@nestjs/swagger'
import { AnimeStatus } from '@enums/animeStatus.enum'

export class CreateAnimeBodyDto {
	@ApiProperty({ name: 'name' })
	name: string

	@ApiProperty({ name: 'poster' })
	poster?: string

	@ApiProperty({ name: 'status', enum: AnimeStatus })
	status: AnimeStatus

	@ApiProperty({
		name: 'aniuId',
		description: 'id that this anime has in the aniu database'
	})
	aniuId?: string

	@ApiProperty({
		name: 'anilibriaId',
		description: 'id that this anime has in the anilibria database'
	})
	anilibriaId?: number

	@ApiProperty({
		name: 'anilibriaCode',
		description: 'code that this anime has in the anilibria database'
	})
	anilibriaCode?: string
}
