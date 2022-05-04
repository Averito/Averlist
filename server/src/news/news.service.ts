import { ForbiddenException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User, UserDocument } from '../user/user.schema'
import { News, NewsDocument } from './news.schema'
import { NOT_ALLOWED } from './news.constants'
import { NewsDto } from './DTO/news.dto'
import { NewsEntity } from './news.entity'

@Injectable()
export class NewsService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		@InjectModel(News.name) private readonly newsModel: Model<NewsDocument>,
		@InjectRepository(NewsEntity) private readonly newsRepository: Repository<NewsEntity>
	) {}

	async getNews() {
		// todo: PostgreSQL
		return await this.newsModel.find({})
	}
	async createNews(id: string, filename: string, description: string) {
		// todo: PostgreSQL
		const user = await this.userModel.findById(id)
		if (user.role !== 'admin') throw new ForbiddenException(NOT_ALLOWED)

		const newNews = {
			picture: filename,
			description,
			lastUpdate: Date.now()
		}
		const createdNews = await new this.newsModel(newNews)
		return await createdNews.save()
	}
	async editNews(id: string, newsId: string, news: NewsDto) {
		// todo: PostgreSQL
		const user = await this.userModel.findById(id)
		if (user.role !== 'admin') throw new ForbiddenException(NOT_ALLOWED)

		await this.newsModel.findByIdAndUpdate(newsId, news)
		return await this.newsModel.findById(newsId)
	}
	async removeNews(id: string, newsId: string) {
		// todo: PostgreSQL
		const user = await this.userModel.findById(id)
		if (user.role !== 'admin') throw new ForbiddenException(NOT_ALLOWED)

		return await this.newsModel.findByIdAndRemove(newsId)
	}
}
