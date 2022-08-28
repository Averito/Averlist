import { ApiProperty } from '@nestjs/swagger'
import { CollectionType } from '@enums/collectionType.enum'

export class CreateCollectionBodyDto {
	@ApiProperty({ name: 'name' })
	name: string

	@ApiProperty({ name: 'type', enum: CollectionType })
	type: CollectionType

	@ApiProperty({ name: 'anime_list', default: 'id,id,id,id' })
	anime_list: string
}
