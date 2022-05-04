import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'

import { AnimeController } from './anime.controller'
import { AnimeService } from './anime.service'
import { Anime, AnimeSchema } from './anime.schema'
import { AnimeEntity } from './anime.entity'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Anime.name, schema: AnimeSchema }]),
		TypeOrmModule.forFeature([AnimeEntity])
	],
	controllers: [AnimeController],
	providers: [AnimeService]
})
export class AnimeModule {}
