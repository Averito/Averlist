import { BadRequestException, Injectable } from '@nestjs/common'
import { News } from '@prisma/client'
import { Express } from 'express'
import { PrismaService } from '../prisma.service'
import { CreateNewsBodyDto } from '@DTO/createNewsBody.dto'
import { removePrevFile } from '@utils/removePrevFile.util'
import { EditNewsBodyDto } from '@DTO/editNewsBody.dto'
import { NEWS_NOT_FOUND } from './news.constants'

@Injectable()
export class NewsService {
	constructor(private readonly prisma: PrismaService) {}

	public async findAll(): Promise<News[]> {
		return this.prisma.news.findMany({})
	}
	public async create(
		news: CreateNewsBodyDto,
		image: Express.Multer.File
	): Promise<News> {
		return this.prisma.news.create({
			data: {
				title: news.title,
				text: news.text,
				image: image.filename
			}
		})
	}
	public async setImage(
		image: Express.Multer.File,
		newsId: string
	): Promise<News> {
		const news = await this.prisma.news.findUnique({ where: { id: newsId } })
		if (!news) throw new BadRequestException(NEWS_NOT_FOUND)

		if (news.image) await removePrevFile('images', news.image)

		return this.prisma.news.update({
			where: {
				id: newsId
			},
			data: {
				image: image.filename
			}
		})
	}
	public async update(
		editNews: EditNewsBodyDto,
		newsId: string
	): Promise<News> {
		const news = await this.prisma.news.findUnique({ where: { id: newsId } })
		if (!news) throw new BadRequestException(NEWS_NOT_FOUND)

		return this.prisma.news.update({
			where: {
				id: newsId
			},
			data: {
				title: editNews.title || news.title,
				text: editNews.text || news.text
			}
		})
	}
	public async remove(newsId: string): Promise<News> {
		const news = await this.prisma.news.findUnique({ where: { id: newsId } })
		if (!news) throw new BadRequestException(NEWS_NOT_FOUND)

		return this.prisma.news.delete({
			where: {
				id: newsId
			}
		})
	}
}
