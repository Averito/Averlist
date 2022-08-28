import { ApiProperty } from '@nestjs/swagger'

export class RemoveUserBodyDto {
	@ApiProperty({ name: 'userId' })
	userId: string
}
