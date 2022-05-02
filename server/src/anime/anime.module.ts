import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AnimeController } from './anime.controller'
import { AnimeService } from './anime.service'
import { Anime, AnimeSchema } from './anime.schema'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Anime.name, schema: AnimeSchema }])
	],
	controllers: [AnimeController],
	providers: [AnimeService]
})
export class AnimeModule {}
