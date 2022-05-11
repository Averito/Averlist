import {
	BadRequestException,
	ForbiddenException,
	Injectable
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AnimeDto } from './DTO/anime.dto'
import {
	THIS_ANIME_NOT_FOUND_BY_USER_ID_ERROR,
	NOT_ALLOWED_ERROR
} from './anime.constants'
import { AnimeEntity } from './anime.entity'
import { UserEntity } from '../user/user.entity'

@Injectable()
export class AnimeService {
	constructor(
		@InjectRepository(AnimeEntity)
		private readonly animeRepository: Repository<AnimeEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	public async getAllAnime(myId: number) {
		const me = await this.userRepository.findOneBy({ id: myId })

		if (me.role !== 'admin') throw new ForbiddenException(NOT_ALLOWED_ERROR)

		return await this.animeRepository.find({
			relations: ['user']
		})
	}
	public async getAllAnimeByUserId(userId: number) {
		const animeByUserId = await this.animeRepository.find({
			relations: ['user'],
			where: {
				user: {
					id: userId
				}
			}
		})
		return animeByUserId
	}
	public async createAnime(anime: AnimeDto, myId: number) {
		const createdAnime = {
			name: anime.name,
			user: myId,
			status: anime.status,
			anilibriaTitleId: anime.anilibriaTitleId
		}

		const savedAnime = await this.animeRepository.save(createdAnime)
		return await this.animeRepository.findOne({
			relations: ['user'],
			where: {
				id: savedAnime.id
			}
		})
	}
	public async editStatusAnime(
		animeIdStr: string | number,
		myId: number,
		status: number
	) {
		const animeId = +animeIdStr
		const anime = await this.animeRepository.findOneBy({
			id: animeId,
			user: { id: myId }
		})
		if (!anime)
			throw new BadRequestException(THIS_ANIME_NOT_FOUND_BY_USER_ID_ERROR)
		anime.status = status
		return await this.animeRepository.save(anime)
	}
}
