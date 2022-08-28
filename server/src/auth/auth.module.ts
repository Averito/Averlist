import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaService } from '../prisma.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from '@config/jwt.config'
import { PassportModule } from '@nestjs/passport'
import { AccessJwtStrategy } from '@strategies/accessJwt.strategy'
import { RefreshJwtStrategy } from '@strategies/refreshJwt.strategy'

@Module({
	imports: [
		ConfigModule.forRoot(),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		PassportModule.register({ defaultStrategy: 'jwt' })
	],
	providers: [
		AuthService,
		ConfigService,
		JwtService,
		PrismaService,
		AccessJwtStrategy,
		RefreshJwtStrategy
	],
	controllers: [AuthController],
	exports: [JwtModule, AccessJwtStrategy, RefreshJwtStrategy, PassportModule]
})
export class AuthModule {}
