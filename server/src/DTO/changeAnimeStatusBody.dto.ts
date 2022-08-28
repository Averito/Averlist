import { ApiProperty } from '@nestjs/swagger'
import { AnimeStatus } from '@enums/animeStatus.enum'

export class ChangeAnimeStatusBodyDto {
	@ApiProperty({ name: 'newStatus', enum: AnimeStatus })
	newStatus: AnimeStatus
}
