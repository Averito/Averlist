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
import { Request } from 'express'

import { JwtAuthGuard } from '../auth/guards/accessT.guard'
import { AnimeService } from './anime.service'
import { AnimeDto } from './DTO/anime.dto'

@ApiTags('Anime')
@UseGuards(JwtAuthGuard)
@Controller('anime')
export class AnimeController {
	constructor(private readonly animeService: AnimeService) {}

	@Get()
	getAllAnime(@Req() req: Request) {
		return this.animeService.getAllAnime(req.user['id'])
	}

	@Get('me')
	getAllAnimeByUserId(@Req() req) {
		return this.animeService.getAllAnimeByUserId(req.user.id)
	}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	createAnime(@Body() anime: AnimeDto, @Req() req: Request) {
		return this.animeService.createAnime(anime, req.user['id'])
	}

	@Patch(':id')
	editStatusAnime(
		@Param() params,
		@Req() req: Request,
		@Body('status') status: number
	) {
		return this.animeService.editStatusAnime(params.id, req.user['id'], status)
	}
}
