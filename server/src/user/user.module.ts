import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { User, UserSchema } from './user.schema'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
	],
	exports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		UserModule,
		UserService
	],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
