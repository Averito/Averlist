import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'

export type AnimeDocument = Anime & Document

@Schema()
export class Anime {
	@Prop({ type: String, size: 100, required: true, unique: false })
	name: string

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		unique: false
	})
	userId: string

	@Prop({ type: Number, required: true, unique: false })
	status: number
}

export const AnimeSchema = SchemaFactory.createForClass(Anime)
