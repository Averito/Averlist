import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '../auth/guards/accessT.guard'
import { AnimeService } from './anime.service'
import { AnimeDto } from './DTO/anime.dto'

@ApiTags('Anime')
@UseGuards(JwtAuthGuard)
@Controller('anime')
export class AnimeController {
	constructor(private readonly animeService: AnimeService) {}

	@Get()
	getAllAnime() {
		return this.animeService.getAllAnime()
	}

	@Get('me')
	getAllAnimeByUserId(@Req() req) {
		return this.animeService.getAllAnimeByUserId(req.user.id)
	}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	createAnime(@Body() anime: AnimeDto) {
		return this.animeService.createAnime(anime)
	}

	@Patch(':id')
	editStatusAnime(@Param() params, @Body('status') status: number) {
		return this.animeService.editStatusAnime(params.id, status)
	}
}
