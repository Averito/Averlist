import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserEntity } from './user.entity'
import { UserResolver } from './user.resolver'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	exports: [TypeOrmModule.forFeature([UserEntity]), UserModule, UserService],
	controllers: [UserController],
	providers: [UserService, UserResolver]
})
export class UserModule {}
