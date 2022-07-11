import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NewsService } from './news.service'
import { NewsController } from './news.controller'
import { UserModule } from '../user/user.module'
import { NewsEntity } from './news.entity'
import { UserEntity } from '../user/user.entity'

@Module({
	providers: [NewsService],
	controllers: [NewsController],
	imports: [
		TypeOrmModule.forFeature([NewsEntity, UserEntity]),
		UserModule
	]
})
export class NewsModule {}
