import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	UploadedFile,
	Param,
	Res,
	Delete
} from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Express, Response } from 'express'
import { Collection, User } from '@prisma/client'
import { Auth } from '@decorators/auth.decorator'
import { CollectionService } from './collection.service'
import { CollectionDto } from '@DTO/collection.dto'
import { CurrentUser } from '@decorators/user.decorator'
import { CreateCollectionBodyDto } from '@DTO/createCollectionBody.dto'
import { ApiFile } from '@decorators/apiFile.decorator'
import { ImageFile } from '@decorators/imageFile.decorator'
import { Public } from '@decorators/public.decorator'
import { EditCollectionBodyDto } from '@DTO/editCollectionBody.dto'

@Controller('collection')
@Auth()
@ApiTags('Collection')
export class CollectionController {
	constructor(private readonly collectionService: CollectionService) {}

	@Get('my')
	@ApiOkResponse({ type: [CollectionDto] })
	async getMyCollections(@CurrentUser() user: User): Promise<Collection[]> {
		return this.collectionService.myCollections(user.id)
	}

	@Get('all')
	@ApiOkResponse({ type: [CollectionDto] })
	async getAllCollections(): Promise<Collection[]> {
		return this.collectionService.allCollections()
	}

	@Get('my-favorites')
	@ApiOkResponse({ type: [CollectionDto] })
	async getMyFavorites(@CurrentUser() user: User): Promise<Collection[]> {
		return this.collectionService.myFavorites(user.id)
	}

	@Get('posters/:posterName')
	@Public()
	async getPoster(
		@Param('posterName') posterName: string,
		@Res() response: Response
	) {
		return response.sendFile(posterName, { root: './uploads/posters' })
	}

	@Post()
	@ApiOkResponse({ type: CollectionDto })
	@ImageFile('poster', './uploads/posters')
	@ApiBody({ type: CreateCollectionBodyDto })
	async createCollection(
		@Body() collection: CreateCollectionBodyDto,
		@UploadedFile() poster: Express.Multer.File,
		@CurrentUser() user: User
	): Promise<Collection> {
		return this.collectionService.createCollection(collection, poster, user.id)
	}

	@Post('add-favorite/:collectionId')
	@ApiOkResponse({ type: CollectionDto })
	async addFavorite(
		@Param('collectionId') collectionId: string,
		@CurrentUser() user: User
	): Promise<Collection> {
		return this.collectionService.addFavorite(collectionId, user.id)
	}

	@Patch('add-poster/:collectionId')
	@ImageFile('poster', './uploads/posters')
	@ApiOkResponse({ type: CollectionDto })
	@ApiFile('poster')
	async addPoster(
		@UploadedFile() poster: Express.Multer.File,
		@Param('collectionId') collectionId: string,
		@CurrentUser() user: User
	): Promise<Collection> {
		return this.collectionService.addPoster(poster, collectionId, user.id)
	}

	@Patch(':collectionId')
	@ApiOkResponse({ type: CollectionDto })
	@ApiBody({ type: EditCollectionBodyDto })
	async editCollection(
		@Body() editCollection: EditCollectionBodyDto,
		@Param('collectionId') collectionId: string,
		@CurrentUser() user: User
	): Promise<Collection> {
		return this.collectionService.editCollection(
			editCollection,
			collectionId,
			user.id
		)
	}

	@Delete('remove-favorite/:collectionId')
	@ApiOkResponse({ type: CollectionDto })
	async removeFavorite(
		@Param('collectionId') collectionId: string,
		@CurrentUser() user: User
	): Promise<Collection> {
		return this.collectionService.removeFavorite(collectionId, user.id)
	}

	@Delete(':collectionId')
	@ApiOkResponse({ type: CollectionDto })
	async removeCollection(
		@Param('collectionId') collectionId: string,
		@CurrentUser() user: User
	): Promise<Collection> {
		return this.collectionService.removeCollection(collectionId, user.id)
	}
}
