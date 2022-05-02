import { BadRequestException, Injectable } from '@nestjs/common'
import * as mongoose from 'mongoose'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { Anime, AnimeDocument } from './anime.schema'
import { AnimeDto } from './DTO/anime.dto'
import {
	THIS_ANIME_NOT_FOUND_BY_USER_ID_ERROR,
	THIS_ANIME_NOT_FOUND_ERROR
} from './anime.constants'

@Injectable()
export class AnimeService {
	constructor(
		@InjectModel(Anime.name) private readonly animeModel: Model<AnimeDocument>
	) {}

	public async getAllAnime() {
		return this.animeModel.find({})
	}

	public async getAnimeByUserId(userId: string) {
		const anime = await this.animeModel
			.aggregate([{ $match: { userId: new mongoose.Types.ObjectId(userId) } }])
			.sort({ name: 1 })

		if (!anime)
			throw new BadRequestException(THIS_ANIME_NOT_FOUND_BY_USER_ID_ERROR)

		return anime
	}

	public async createAnime(anime: AnimeDto) {
		const newAnime = new this.animeModel(anime)
		return newAnime.save()
	}

	public async editStatusAnime(id: string, editedAnime) {
		const anime = await this.animeModel.findById(id)
		if (!anime)
			throw new BadRequestException(THIS_ANIME_NOT_FOUND_BY_USER_ID_ERROR)
		return this.animeModel.findByIdAndUpdate(id, editedAnime)
	}

	public async deleteAllAnime() {
		return this.animeModel.deleteMany({})
	}

	public async deleteAnimeById(id: string) {
		const hasAnime = await this.animeModel.findById(id)
		if (!hasAnime) throw new BadRequestException(THIS_ANIME_NOT_FOUND_ERROR)

		return this.animeModel.findByIdAndDelete(id)
	}
}
