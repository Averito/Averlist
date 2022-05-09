import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	invitedUser: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	senderUser: string
}
