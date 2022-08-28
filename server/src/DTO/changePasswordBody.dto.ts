import { ApiProperty } from '@nestjs/swagger'

export class ChangePasswordBodyDto {
	@ApiProperty({ name: 'oldPassword' })
	oldPassword: string

	@ApiProperty({ name: 'newPassword' })
	newPassword: string
}
