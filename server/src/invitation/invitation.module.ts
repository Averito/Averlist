import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { InvitationService } from './invitation.service'
import { InvitationController } from './invitation.controller'
import { UserModule } from '../user/user.module'
import { InvitationEntity } from './invitation.entity'
import { UserEntity } from '../user/user.entity'
import { InvitationResolver } from './invitation.resolver'

@Module({
	imports: [
		TypeOrmModule.forFeature([InvitationEntity, UserEntity]),
		UserModule
	],
	exports: [InvitationModule],
	providers: [InvitationService, InvitationResolver],
	controllers: [InvitationController]
})
export class InvitationModule {}
