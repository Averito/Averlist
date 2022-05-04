import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'

import { NewsService } from './news.service'
import { NewsController } from './news.controller'
import { UserModule } from '../user/user.module'
import { User, UserSchema } from '../user/user.schema'
import { News, NewsSchema } from './news.schema'
import { NewsEntity } from './news.entity'

@Module({
	providers: [NewsService],
	controllers: [NewsController],
	imports: [
		TypeOrmModule.forFeature([NewsEntity]),
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: News.name, schema: NewsSchema }
		]),
		UserModule
	]
})
export class NewsModule {}
