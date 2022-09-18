import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Anime, User } from '@prisma/client'
import { Auth } from '@decorators/auth.decorator'
import { AnimeService } from './anime.service'
import { CurrentUser } from '@decorators/user.decorator'
import { CreateAnimeBodyDto } from '@DTO/createAnimeBody.dto'
import { CreateAnimeResponseDto } from '@DTO/createAnimeResponse.dto'
import { AnimeDto } from '@DTO/anime.dto'
import { ChangeAnimeStatusBodyDto } from '@DTO/changeAnimeStatusBody.dto'
import { AnimeStatus } from '@enums/animeStatus.enum'
import { Public } from '@decorators/public.decorator'

@Controller('anime')
@Auth()
@ApiTags('Anime')
export class AnimeController {
	constructor(private readonly animeService: AnimeService) {}

	@Get()
	@ApiOkResponse({ type: [AnimeDto] })
	async getAnimeList(@CurrentUser() user: User): Promise<Anime[]> {
		return this.animeService.getAnimeList(user.id)
	}

	@Get(':anilibriaId')
	@Public()
	@ApiOkResponse({ type: [AnimeDto] })
	async getAnimeListByAnilibriaId(
		@Param('anilibriaId') anilibriaId: string
	): Promise<Anime[]> {
		return this.animeService.getAnimeListByAnilibriaId(+anilibriaId)
	}

	@Post()
	@ApiOkResponse({ type: [CreateAnimeResponseDto] })
	@ApiBody({ type: CreateAnimeBodyDto })
	async createAnime(
		@Body() anime: CreateAnimeBodyDto,
		@CurrentUser() user: User
	): Promise<Anime> {
		return this.animeService.createAnime(anime, user.id)
	}

	@Patch(':animeId')
	@ApiOkResponse({ type: AnimeDto })
	@ApiBody({ type: ChangeAnimeStatusBodyDto })
	async changeStatus(
		@CurrentUser() user: User,
		@Body('newStatus') newStatus: AnimeStatus,
		@Param('animeId') animeId: string
	) {
		return this.animeService.changeStatus(animeId, newStatus, user.id)
	}

	@Delete(':animeId')
	@ApiOkResponse({ type: AnimeDto })
	async removeAnime(
		@CurrentUser() user: User,
		@Param('animeId') animeId: string
	): Promise<Anime> {
		return this.animeService.removeAnime(animeId, user.id)
	}
}
