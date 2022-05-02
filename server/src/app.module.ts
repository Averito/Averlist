import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'

import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { getMongoDbConfig } from './config/mongo.config'
import { AnimeModule } from './anime/anime.module'
import { InvitationModule } from './invitation/invitation.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoDbConfig
		}),
		MulterModule.register({
			dest: './uploads'
		}),
		UserModule,
		InvitationModule,
		AuthModule,
		AnimeModule,
		InvitationModule
	]
})
export class AppModule {}
