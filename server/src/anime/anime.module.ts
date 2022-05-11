import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AnimeController } from './anime.controller'
import { AnimeService } from './anime.service'
import { AnimeEntity } from './anime.entity'
import { AnimeResolver } from './anime.resolver'
import { UserModule } from '../user/user.module'
import { UserEntity } from '../user/user.entity'

@Module({
	imports: [TypeOrmModule.forFeature([AnimeEntity, UserEntity]), UserModule],
	controllers: [AnimeController],
	providers: [AnimeService, AnimeResolver]
})
export class AnimeModule {}
