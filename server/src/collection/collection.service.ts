import { BadRequestException, Injectable } from '@nestjs/common'
import { Collection } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { CreateCollectionBodyDto } from '@DTO/createCollectionBody.dto'
import { removePrevFile } from '@utils/removePrevFile.util'
import { EditCollectionBodyDto } from '@DTO/editCollectionBody.dto'
import {
	FAVORITE_WITH_THIS_USER_NOT_FOUND,
	TYPE_OF_COLLECTION_IS_PRIVATE,
	USER_WITH_THIS_COLLECTION_NOT_FOUND
} from './collection.constants'

@Injectable()
export class CollectionService {
	constructor(private readonly prisma: PrismaService) {}

	public async myCollections(userId: string): Promise<Collection[]> {
		return this.prisma.collection.findMany({
			where: {
				createdById: userId
			},
			include: {
				anime_list: true,
				favoritesBy: true
			}
		})
	}
	public async allCollections(): Promise<Collection[]> {
		return this.prisma.collection.findMany({
			include: {
				createdBy: true,
				anime_list: true,
				favoritesBy: {
					select: {
						user: true
					}
				}
			},
			where: {
				type: 'public'
			},
			orderBy: {
				created_at: 'asc'
			}
		})
	}
	public async myFavorites(userId: string): Promise<Collection[]> {
		return this.prisma.collection.findMany({
			include: {
				createdBy: true,
				anime_list: true
			},
			where: {
				favoritesBy: {
					some: {
						userId
					}
				}
			}
		})
	}
	public async createCollection(
		collection: CreateCollectionBodyDto,
		poster: Express.Multer.File,
		userId: string
	): Promise<Collection> {
		const animeListIds = collection.anime_list
			.split(',')
			.map(animeId => ({ id: animeId }))

		return this.prisma.collection.create({
			data: {
				name: collection.name,
				poster: poster.filename,
				type: collection.type,
				createdById: userId,
				anime_list: {
					connect: animeListIds
				}
			},
			include: {
				anime_list: true
			}
		})
	}
	public async addPoster(
		poster: Express.Multer.File,
		collectionId: string,
		userId: string
	): Promise<Collection> {
		const collections = await this.prisma.collection.findMany({
			where: {
				id: collectionId,
				createdById: userId
			}
		})
		if (!collections.length)
			throw new BadRequestException(USER_WITH_THIS_COLLECTION_NOT_FOUND)

		const collection = collections[0]
		if (collection.poster) await removePrevFile('posters', collection.poster)

		return this.prisma.collection.update({
			where: {
				id: collectionId
			},
			data: {
				poster: poster.filename
			}
		})
	}
	public async editCollection(
		editCollection: EditCollectionBodyDto,
		collectionId: string,
		userId: string
	): Promise<Collection> {
		const collections = await this.prisma.collection.findMany({
			where: {
				id: collectionId,
				createdById: userId
			}
		})
		if (!collections.length)
			throw new BadRequestException(USER_WITH_THIS_COLLECTION_NOT_FOUND)

		const collection = collections[0]

		return this.prisma.collection.update({
			where: {
				id: collectionId
			},
			data: {
				name: editCollection.name || collection.name,
				type: editCollection.type || collection.type
			}
		})
	}
	public async removeCollection(
		collectionId: string,
		userId: string
	): Promise<Collection> {
		const collections = await this.prisma.collection.findMany({
			where: {
				id: collectionId,
				createdById: userId
			}
		})
		if (!collections.length)
			throw new BadRequestException(USER_WITH_THIS_COLLECTION_NOT_FOUND)

		await removePrevFile('posters', collections[0].poster)

		return this.prisma.collection.delete({
			where: {
				id: collectionId
			}
		})
	}
	public async addFavorite(
		collectionId: string,
		userId: string
	): Promise<Collection> {
		const collection = await this.prisma.collection.findUnique({
			where: { id: collectionId }
		})
		if (collection && collection.type === 'private')
			throw new BadRequestException(TYPE_OF_COLLECTION_IS_PRIVATE)

		await this.prisma.favoriteCollectionsOnUsers.create({
			data: {
				collectionId,
				userId
			}
		})

		return await this.prisma.collection.findUnique({
			where: { id: collectionId },
			include: {
				anime_list: true,
				favoritesBy: true
			}
		})
	}
	public async removeFavorite(
		collectionId: string,
		userId: string
	): Promise<Collection> {
		const hasFavorite = await this.prisma.favoriteCollectionsOnUsers.findUnique(
			{
				where: {
					userId_collectionId: {
						userId,
						collectionId
					}
				}
			}
		)
		if (!hasFavorite)
			throw new BadRequestException(FAVORITE_WITH_THIS_USER_NOT_FOUND)

		await this.prisma.favoriteCollectionsOnUsers.delete({
			where: {
				userId_collectionId: {
					userId,
					collectionId
				}
			}
		})

		return this.prisma.collection.findUnique({
			where: {
				id: collectionId
			}
		})
	}
}
