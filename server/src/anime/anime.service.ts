import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { Anime, AnimeDocument } from './anime.schema'
import { AnimeDto } from './DTO/anime.dto'
import { THIS_ANIME_NOT_FOUND_BY_USER_ID_ERROR } from './anime.constants'
import { AnimeEntity } from './anime.entity'

@Injectable()
export class AnimeService {
	constructor(
		@InjectModel(Anime.name) private readonly animeModel: Model<AnimeDocument>,
		@InjectRepository(AnimeEntity)
		private readonly animeRepository: Repository<AnimeEntity>
	) {}

	public async getAllAnime() {
		return this.animeRepository.find({
			relations: ['user']
		})
	}
	public async createAnime(anime: AnimeDto) {
		const createdAnime = {
			name: anime.name,
			user: anime.userId,
			status: anime.status
		}

		return await this.animeRepository.save(createdAnime)
	}
	public async editStatusAnime(id: string, editedAnime) {
		// todo: PostgreSQL
		const anime = await this.animeModel.findById(id)
		if (!anime)
			throw new BadRequestException(THIS_ANIME_NOT_FOUND_BY_USER_ID_ERROR)
		return this.animeModel.findByIdAndUpdate(id, editedAnime)
	}
}
