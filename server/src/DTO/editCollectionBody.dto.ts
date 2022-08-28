import { ApiProperty } from '@nestjs/swagger'
import { CollectionType } from '@enums/collectionType.enum'

export class EditCollectionBodyDto {
	@ApiProperty({ name: 'name' })
	name?: string

	@ApiProperty({ name: 'type', enum: CollectionType })
	type?: CollectionType
}
