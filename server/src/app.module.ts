import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { MulterModule } from '@nestjs/platform-express'
import { AnimeModule } from './anime/anime.module'

@Module({
	imports: [
		UserModule,
		AuthModule,
		MulterModule.register({
			dest: './uploads',
			limits: { fileSize: 1024 * 1024 * 3 }
		}),
		AnimeModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
