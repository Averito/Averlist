import { SelectMenu } from '@components/Select'
import { Averlist } from '@averlistApi/types'
import CollectionType = Averlist.CollectionType

export const collectionTypeOptions: SelectMenu<Averlist.CollectionType>[] = [
	{
		id: 1,
		label: 'Публичный',
		value: CollectionType.PUBLIC
	},
	{
		id: 2,
		label: 'Приватный',
		value: CollectionType.PRIVATE
	}
]
