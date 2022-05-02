import { IsArray, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	login: string

	@ApiProperty({
		uniqueItems: true
	})
	@IsNotEmpty()
	@IsString()
	email: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string

	@ApiProperty({
		required: false
	})
	@IsString()
	description?: string

	@ApiProperty({
		required: false
	})
	@IsString()
	avatar?: string

	@ApiProperty({
		required: false
	})
	@IsArray()
	friendList?: string[]
}
