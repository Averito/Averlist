import { ApiProperty } from '@nestjs/swagger'

export class LoginBodyDto {
	@ApiProperty({ name: 'email' })
	email: string

	@ApiProperty({ name: 'password' })
	password?: string

	@ApiProperty({
		name: 'discordId',
		description: 'id from discord'
	})
	discordId?: number

	@ApiProperty({
		name: 'vkId',
		description: 'id from vk'
	})
	vkId?: number
}
