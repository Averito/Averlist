import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import { getJWTConfig } from '../config/jwt.config'
import { AccessTStrategy } from './strategies/accessT.strategy'
import { UserModule } from '../user/user.module'
import { UserEntity } from '../user/user.entity'
import { RefreshTStrategy } from './strategies/refreshT.strategy'
import { AuthResolver } from './auth.resolver';

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		}),
		TypeOrmModule.forFeature([UserEntity]),
		PassportModule,
		UserModule,
		PassportModule.register({ defaultStrategy: 'jwt' })
	],
	controllers: [AuthController],
	providers: [AuthService, UserService, AccessTStrategy, RefreshTStrategy, AuthResolver]
})
export class AuthModule {}
