import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Res,
	UploadedFile
} from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { News } from '@prisma/client'
import { Express, Response } from 'express'
import { Auth } from '@decorators/auth.decorator'
import { Role } from '@enums/role.enum'
import { Public } from '@decorators/public.decorator'
import { NewsService } from './news.service'
import { NewsDto } from '@DTO/news.dto'
import { CreateNewsBodyDto } from '@DTO/createNewsBody.dto'
import { EditNewsBodyDto } from '@DTO/editNewsBody.dto'
import { ImageFile } from '@decorators/imageFile.decorator'
import { ApiFile } from '@decorators/apiFile.decorator'
import { Roles } from '@decorators/role.decorator'

@Controller('news')
@Auth()
@ApiTags('News')
export class NewsController {
	constructor(private readonly newsService: NewsService) {}

	@Get()
	@Public()
	@ApiOkResponse({ type: NewsDto })
	async findAll(): Promise<News[]> {
		return this.newsService.findAll()
	}

	@Get('images/:imageName')
	@Public()
	async getImage(@Res() res: Response, @Param('imageName') imageName: string) {
		return res.sendFile(imageName, { root: './uploads/images' })
	}

	@Post()
	@Roles(Role.ADMIN)
	@ImageFile('image', './uploads/images')
	@ApiOkResponse({ type: NewsDto })
	@ApiBody({ type: CreateNewsBodyDto })
	async create(
		@Body() createNewsDto: CreateNewsBodyDto,
		@UploadedFile() image: Express.Multer.File
	): Promise<News> {
		return this.newsService.create(createNewsDto, image)
	}

	@Patch('set-image/:newsId')
	@Roles(Role.ADMIN)
	@ImageFile('image', './uploads/images')
	@ApiOkResponse({ type: NewsDto })
	@ApiFile()
	async setImage(
		@UploadedFile() image: Express.Multer.File,
		@Param('newsId') newsId: string
	) {
		return this.newsService.setImage(image, newsId)
	}

	@Patch(':newsId')
	@Roles(Role.ADMIN)
	@ApiOkResponse({ type: NewsDto })
	@ApiBody({ type: EditNewsBodyDto })
	update(
		@Body() updateNewsDto: EditNewsBodyDto,
		@Param('newsId') newsId: string
	): Promise<News> {
		return this.newsService.update(updateNewsDto, newsId)
	}

	@Delete(':newsId')
	@Roles(Role.ADMIN)
	@ApiOkResponse({ type: NewsDto })
	remove(@Param('newsId') newsId: string): Promise<News> {
		return this.newsService.remove(newsId)
	}
}
