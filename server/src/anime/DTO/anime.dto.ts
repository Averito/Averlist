import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

enum statuses {
	'Просмотренно',
	'Смотрю',
	'Запланированно',
	'Выходит',
	'Заброшено'
}

export class AnimeDto {
	@ApiProperty({
		description: 'Название аниме'
	})
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty()
	@IsNotEmpty()
	user: number

	@ApiProperty({
		description: 'Статус определяющий состояние аниме в списке'
	})
	@IsNotEmpty()
	@IsEnum(statuses)
	status: number

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	anilibriaTitleId: number
}
