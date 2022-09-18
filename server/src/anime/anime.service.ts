import { BadRequestException, Injectable } from '@nestjs/common'
import { Anime } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { CreateAnimeBodyDto } from '@DTO/createAnimeBody.dto'
import { USER_WITH_THIS_ANIME_NOT_FOUND } from './anime.constants'
import { AnimeStatus } from '@enums/animeStatus.enum'

@Injectable()
export class AnimeService {
	constructor(private readonly prisma: PrismaService) {}

	public async getAnimeListByAnilibriaId(
		anilibriaId: number
	): Promise<Anime[]> {
		return this.prisma.anime.findMany({
			where: {
				anilibriaId
			}
		})
	}
	public async getAnimeList(userId: string): Promise<Anime[]> {
		return this.prisma.anime.findMany({
			where: {
				userId
			},
			orderBy: {
				name: 'asc'
			}
		})
	}
	public async createAnime(
		anime: CreateAnimeBodyDto,
		userId: string
	): Promise<Anime> {
		return this.prisma.anime.create({
			include: {
				user: true
			},
			data: {
				name: anime.name,
				poster: anime.poster,
				anilibriaId: anime.anilibriaId,
				aniuId: anime.aniuId,
				status: anime.status,
				userId
			}
		})
	}
	public async changeStatus(
		animeId: string,
		newStatus: AnimeStatus,
		userId: string
	) {
		const anime = await this.prisma.anime.findMany({
			where: {
				id: animeId,
				userId
			}
		})
		if (!anime.length)
			throw new BadRequestException(USER_WITH_THIS_ANIME_NOT_FOUND)

		return this.prisma.anime.update({
			where: {
				id: animeId
			},
			data: {
				status: newStatus
			}
		})
	}
	public async removeAnime(animeId: string, userId: string): Promise<Anime> {
		const anime = await this.prisma.anime.findMany({
			where: {
				id: animeId,
				userId
			}
		})
		if (!anime.length)
			throw new BadRequestException(USER_WITH_THIS_ANIME_NOT_FOUND)

		return this.prisma.anime.delete({
			where: {
				id: animeId
			}
		})
	}
}
