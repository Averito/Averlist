import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaService } from '../prisma.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { DiscordStrategy } from '@strategies/discord.strategy'
import { SessionSerializer } from '@helpers/sessionSerializer'
import { VkStrategy } from '@strategies/vk.strategy'
import { GoogleStrategy } from '@strategies/google.strategy'
import { YandexStrategy } from '@strategies/yandex.strategy'

@Module({
	imports: [ConfigModule.forRoot(), PassportModule.register({ session: true })],
	providers: [
		AuthService,
		ConfigService,
		PrismaService,
		DiscordStrategy,
		GoogleStrategy,
		YandexStrategy,
		VkStrategy,
		SessionSerializer,
		{
			provide: 'PRISMA_SERVICE',
			useClass: PrismaService
		}
	],
	controllers: [AuthController],
	exports: [
		DiscordStrategy,
		GoogleStrategy,
		YandexStrategy,
		VkStrategy,
		PassportModule
	]
})
export class AuthModule {}
