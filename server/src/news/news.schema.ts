import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type NewsDocument = News & mongoose.Document

@Schema()
export class News {
	@Prop({ type: String, required: false, unique: false })
	picture: string

	@Prop({ type: String, required: true, unique: false })
	description: string

	@Prop({ type: Number, required: true, unique: false })
	lastUpdate: number
}

export const NewsSchema = SchemaFactory.createForClass(News)
