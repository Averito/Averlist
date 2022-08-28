import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { MulterModule } from '@nestjs/platform-express'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getNodemailerConfig } from '@config/nodemailer.config'
import { AnimeModule } from './anime/anime.module'
import { CollectionModule } from './collection/collection.module'
import { InvitationModule } from './invitation/invitation.module'

@Module({
	imports: [
		UserModule,
		AuthModule,
		MulterModule.register({
			dest: './uploads'
		}),
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getNodemailerConfig
		}),
		AnimeModule,
		CollectionModule,
		InvitationModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
