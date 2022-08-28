import { ApiProperty } from '@nestjs/swagger'

export class GetAccessResponseDto {
	@ApiProperty({ name: 'accessToken' })
	accessToken: string
}
