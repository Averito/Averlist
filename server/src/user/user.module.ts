import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserEntity } from './user.entity'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	exports: [TypeOrmModule.forFeature([UserEntity]), UserModule, UserService],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
