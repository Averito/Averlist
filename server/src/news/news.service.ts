import { ForbiddenException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { NOT_ALLOWED } from './news.constants'
import { NewsEntity } from './news.entity'
import { UserEntity } from '../user/user.entity'

@Injectable()
export class NewsService {
	constructor(
		@InjectRepository(NewsEntity)
		private readonly newsRepository: Repository<NewsEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async getNews() {
		return await this.newsRepository.find()
	}
	async createNews(id: number, filename: string, description: string) {
		const user = await this.userRepository.findOneBy({ id })
		if (user.role !== 'admin') throw new ForbiddenException(NOT_ALLOWED)

		const newNews = {
			picture: filename,
			description
		}
		return await this.newsRepository.save(newNews)
	}
	async editNews(id: number, newsIdStr: string, description: string) {
		const newsId = +newsIdStr
		const user = await this.userRepository.findOneBy({ id })
		if (user.role !== 'admin') throw new ForbiddenException(NOT_ALLOWED)

		const newsForUpdate = await this.newsRepository.findOneBy({ id: newsId })
		newsForUpdate.description = description
		return await this.newsRepository.save(newsForUpdate)
	}
	async removeNews(id: number, newsIdStr: string) {
		const newsId = +newsIdStr

		const user = await this.userRepository.findOneBy({ id })
		if (user.role !== 'admin') throw new ForbiddenException(NOT_ALLOWED)

		const news = await this.newsRepository.findOneBy({ id: newsId })
		return await this.newsRepository.remove(news)
	}
}
