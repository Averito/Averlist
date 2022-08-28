import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from '../prisma.service'

@Module({
	providers: [UserService, PrismaService],
	controllers: [UserController]
})
export class UserModule {}
