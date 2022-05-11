import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Request } from 'express'

import { Anime } from './anime.model'
import { AnimeService } from './anime.service'
import { JwtAuthGuard } from '../auth/guards/accessT.guard'
import { AnimeDto } from './DTO/anime.dto'

@Resolver(() => Anime)
@UseGuards(JwtAuthGuard)
export class AnimeResolver {
	constructor(private readonly animeService: AnimeService) {}

	@Query(() => [Anime])
	allAnime(@Context() context: Request) {
		return this.animeService.getAllAnime(context.user['id'])
	}

	@Query(() => [Anime])
	myAnime(@Context() context: Request) {
		return this.animeService.getAllAnimeByUserId(context.user['id'])
	}

	@Mutation(() => Anime)
	createAnime(
		@Args('name') name: string,
		@Args('status') status: number,
		@Args('anilibriaTitleId') anilibriaTitleId: number,
		@Context() context: Request
	) {
		const anime: AnimeDto = {
			name,
			status,
			anilibriaTitleId
		}
		return this.animeService.createAnime(anime, context.user['id'])
	}

	@Mutation(() => Anime)
	editAnimeStatus(
		@Context() context: Request,
		@Args('animeId') animeId: number,
		@Args('status') status: number
	) {
		return this.animeService.editStatusAnime(
			animeId,
			context.user['id'],
			status
		)
	}
}
