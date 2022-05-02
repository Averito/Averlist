import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { User, UserSchema } from '../user/user.schema'
import { UserService } from '../user/user.service'
import { getJWTConfig } from '../config/jwt.config'
import { JwtStrategy } from './strategies/jwt.strategy'
import { UserModule } from '../user/user.module'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		}),
		PassportModule,
		UserModule,
		PassportModule.register({ defaultStrategy: 'jwt' })
	],
	controllers: [AuthController],
	providers: [AuthService, UserService, JwtStrategy]
})
export class AuthModule {}
