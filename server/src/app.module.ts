import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MulterModule } from '@nestjs/platform-express'

import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { AnimeModule } from './anime/anime.module'
import { InvitationModule } from './invitation/invitation.module'
import { NewsModule } from './news/news.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			autoLoadEntities: true
		}),
		MulterModule.register({
			dest: './uploads'
		}),
		UserModule,
		InvitationModule,
		AuthModule,
		AnimeModule,
		InvitationModule,
		NewsModule
	]
})
export class AppModule {}
