import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type InvitationDocument = Invitation & mongoose.Document

@Schema()
export class Invitation {
	@Prop({ type: Boolean, required: true })
	status: boolean

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		unique: false
	})
	invitedUser: string

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		unique: false
	})
	senderUser: string
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation)
