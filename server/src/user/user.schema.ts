import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type UserDocument = User & mongoose.Document

@Schema()
export class User {
	@Prop({ type: String, required: true, unique: false, size: 100 })
	login: string

	@Prop({ type: String, required: true, unique: true, size: 150 })
	email: string

	@Prop({ type: String, required: true, unique: false, size: 150 })
	password: string

	@Prop({ type: String, required: false, unique: false })
	description: string

	@Prop({ type: String, required: false, unique: false })
	avatar: string

	@Prop({
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'User',
		required: false,
		unique: false
	})
	friendList: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
