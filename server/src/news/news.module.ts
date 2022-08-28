import { Module } from '@nestjs/common'
import { NewsService } from './news.service'
import { NewsController } from './news.controller'
import { PrismaService } from '../prisma.service'

@Module({
	controllers: [NewsController],
	providers: [NewsService, PrismaService]
})
export class NewsModule {}
