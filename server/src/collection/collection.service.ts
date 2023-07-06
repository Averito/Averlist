import { BadRequestException, Injectable } from '@nestjs/common'
import { Collection } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { CreateCollectionBodyDto } from '@DTO/createCollectionBody.dto'
import { removePrevFile } from '@utils/removePrevFile.util'
import { EditCollectionBodyDto } from '@DTO/editCollectionBody.dto'
import { decode } from 'jsonwebtoken'
import {
	FAVORITE_WITH_THIS_USER_NOT_FOUND,
	THIS_COLLECTION_IS_NOT_FOUND,
	THIS_USER_NOT_HAS_IT_COLLECTION,
	TYPE_OF_COLLECTION_IS_PRIVATE,
	USER_WITH_THIS_COLLECTION_NOT_FOUND
} from './collection.constants'
import { CollectionType } from '@enums/collectionType.enum'
import { JwtPayload } from '@interfaces/jwtPayload.interface'

@Injectable()
export class CollectionService {
	constructor(private readonly prisma: PrismaService) {}

	public async myCollections(userId: string): Promise<Collection[]> {
		return this.prisma.collection.findMany({
			where: {
				createdById: userId
			},
			include: {
				anime_list: {
					select: {
						anime: true
					}
				},
				favoritesBy: {
					select: {
						user: true
					}
				},
				createdBy: true
			}
		})
	}

	public async getCollectionById(collectionId: string, token: string) {
		const jwtPayload = decode(token) as JwtPayload
		const user = await this.prisma.user.findUnique({
			where: { id: jwtPayload?.userId }
		})

		const collection = await this.prisma.collection.findUnique({
			where: { id: collectionId },
			include: {
				createdBy: true,
				anime_list: {
					select: {
						anime: true
					}
				},
				favoritesBy: true
			}
		})
		if (!collection) throw new BadRequestException(THIS_COLLECTION_IS_NOT_FOUND)

		if (
			collection.type === CollectionType.PRIVATE &&
			collection.createdById !== user?.id
		)
			throw new BadRequestException(THIS_USER_NOT_HAS_IT_COLLECTION)

		return collection
	}

	public async allCollections(
		page: number,
		pageSize: number,
		search: string
	): Promise<Collection[]> {
		return await this.prisma.collection.findMany({
			include: {
				createdBy: true,
				anime_list: {
					select: {
						anime: true
					}
				},
				favoritesBy: {
					select: {
						user: true
					}
				}
			},
			where: {
				name: {
					contains: search.toLowerCase()
				},
				type: CollectionType.PUBLIC
			},
			orderBy: {
				created_at: 'asc'
			},
			take: pageSize,
			skip: (page - 1) * pageSize
		})
	}

	public async myFavorites(userId: string): Promise<Collection[]> {
		return this.prisma.collection.findMany({
			include: {
				createdBy: true,
				anime_list: {
					select: {
						anime: true
					}
				}
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
		const createdCollection = await this.prisma.collection.create({
			data: {
				name: collection.name,
				poster: poster.filename,
				type: collection.type,
				createdById: userId
			},
			select: {
				id: true
			}
		})

		for (const animeId of collection.anime_list.split(',')) {
			if (!animeId) continue

			await this.prisma.animeOnCollection.create({
				data: {
					animeId,
					collectionId: createdCollection.id
				}
			})
		}

		return this.prisma.collection.findUnique({
			where: {
				id: createdCollection.id
			},
			include: {
				anime_list: {
					select: {
						anime: true
					}
				},
				createdBy: true
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

		await this.prisma.animeOnCollection.deleteMany({
			where: {
				collectionId: collectionId
			}
		})

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
				createdBy: true,
				anime_list: {
					select: {
						anime: true
					}
				},
				favoritesBy: {
					select: {
						user: true
					}
				}
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
