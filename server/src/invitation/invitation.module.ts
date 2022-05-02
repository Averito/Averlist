import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'

import { Invitation, InvitationSchema } from './invitation.schema'
import { InvitationService } from './invitation.service'
import { User, UserSchema } from '../user/user.schema'
import { InvitationController } from './invitation.controller'
import { UserModule } from '../user/user.module'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Invitation.name, schema: InvitationSchema },
			{ name: User.name, schema: UserSchema }
		]),
		UserModule
	],
	exports: [
		MongooseModule.forFeature([
			{ name: Invitation.name, schema: InvitationSchema }
		]),
		InvitationModule
	],
	providers: [InvitationService],
	controllers: [InvitationController]
})
export class InvitationModule {}
