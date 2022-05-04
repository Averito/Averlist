import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { AnimeService } from './anime.service'
import { AnimeDto } from './DTO/anime.dto'

@ApiTags('Anime')
@Controller('anime')
export class AnimeController {
	constructor(private readonly animeService: AnimeService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	getAllAnime() {
		return this.animeService.getAllAnime()
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe({ transform: true }))
	createAnime(@Body() anime: AnimeDto) {
		return this.animeService.createAnime(anime)
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	editStatusAnime(@Param() params, @Body() anime: AnimeDto) {
		return this.animeService.editStatusAnime(params.id, anime)
	}
}
