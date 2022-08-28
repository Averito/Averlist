import { Module } from '@nestjs/common'
import { AnimeController } from './anime.controller'
import { AnimeService } from './anime.service'
import { PrismaService } from '../prisma.service'

@Module({
	controllers: [AnimeController],
	providers: [AnimeService, PrismaService]
})
export class AnimeModule {}
