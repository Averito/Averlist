import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Request } from 'express'

import { News } from './news.model'
import { NewsService } from './news.service'
import { JwtAuthGuard } from '../auth/guards/accessT.guard'

@Resolver(() => News)
@UseGuards(JwtAuthGuard)
export class NewsResolver {
	constructor(private readonly newsService: NewsService) {}

	@Query(() => [News])
	news() {
		return this.newsService.getNews()
	}

	@Mutation(() => News)
	newsEditDescription(
		@Args('newsId') newsId: number,
		@Args('description') description: string,
		@Context() context: Request
	) {
		return this.newsService.editNews(context.user['id'], newsId, description)
	}

	@Mutation(() => News)
	removeNews(@Args('newsId') newsId: number, @Context() context: Request) {
		return this.newsService.removeNews(context.user['id'], newsId)
	}
}
