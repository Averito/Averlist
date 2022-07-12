import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AnimeDto } from './DTO/anime.dto'
import { THIS_ANIME_NOT_FOUND_BY_USER_ID_ERROR } from './anime.constants'
import { AnimeEntity } from './anime.entity'

@Injectable()
export class AnimeService {
	constructor(
		@InjectRepository(AnimeEntity)
		private readonly animeRepository: Repository<AnimeEntity>
	) {}

	public async getAllAnime() {
		return this.animeRepository.find({
			relations: ['user']
		})
	}
	public async getAllAnimeByUserId(userId: number) {
		const animeByUserId = await this.animeRepository.find({
			where: {
				user: {
					id: userId
				}
			}
		})
		return animeByUserId
	}
	public async createAnime(anime: AnimeDto) {
		const createdAnime = {
			name: anime.name,
			user: anime.user,
			status: anime.status
		}

		return await this.animeRepository.save(createdAnime)
	}
	public async editStatusAnime(animeIdStr: string, status: number) {
		const animeId = +animeIdStr
		const anime = await this.animeRepository.findOneBy({ id: animeId })
		if (!anime)
			throw new BadRequestException(THIS_ANIME_NOT_FOUND_BY_USER_ID_ERROR)
		anime.status = status
		return await this.animeRepository.save(anime)
	}
}
