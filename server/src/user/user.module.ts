import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { User, UserSchema } from './user.schema'
import { UserEntity } from './user.entity'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		TypeOrmModule.forFeature([UserEntity])
	],
	exports: [
		TypeOrmModule.forFeature([UserEntity]),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		UserModule,
		UserService
	],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
