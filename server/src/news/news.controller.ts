import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Req,
	Res,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Express } from 'express'
import { diskStorage } from 'multer'

import { NewsService } from './news.service'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { NewsDto } from './DTO/news.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { editFileName } from '../helpers/editFileName'
import { imageFileFilter } from '../helpers/imageFileFilter'

@ApiTags('News')
@Controller('news')
export class NewsController {
	constructor(private readonly newsService: NewsService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	getNews() {
		return this.newsService.getNews()
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(
		FileInterceptor('picture', {
			storage: diskStorage({
				destination: './uploads/news-pictures',
				filename: editFileName
			}),
			fileFilter: imageFileFilter
		})
	)
	createNews(
		@Req() req,
		@UploadedFile() picture: Express.Multer.File,
		@Body() body: { description: string }
	) {
		return this.newsService.createNews(
			req.user.id,
			picture?.filename || '',
			body.description
		)
	}

	@Get('picture/:pictureId')
	getPicture(@Param('pictureId') pictureId, @Res() res) {
		res.sendFile(pictureId, { root: 'uploads/news-pictures' })
	}

	@Put(':newsId')
	@UseGuards(JwtAuthGuard)
	editNews(@Req() req, @Param('newsId') newsId: string, @Body() news: NewsDto) {
		return this.newsService.editNews(req.user.id, newsId, news)
	}

	@Delete(':newsId')
	@UseGuards(JwtAuthGuard)
	removeNews(@Req() req, @Param('newsId') newsId: string) {
		return this.newsService.removeNews(req.user.id, newsId)
	}
}
