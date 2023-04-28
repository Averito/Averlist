import { SelectMenu } from '@components/Select'
import { Averlist } from '@averlistApi/types'
import AnimeStatus = Averlist.AnimeStatus

export const statusFilterOptions: SelectMenu<Averlist.AnimeStatus | null>[] = [
	{
		id: 0,
		label: 'Все',
		value: null
	},
	{
		id: 1,
		label: AnimeStatus.VIEWED,
		value: AnimeStatus.VIEWED
	},
	{
		id: 2,
		label: AnimeStatus.LOOK,
		value: AnimeStatus.LOOK
	},
	{
		id: 3,
		label: AnimeStatus.PLANNED,
		value: AnimeStatus.PLANNED
	},
	{
		id: 4,
		label: AnimeStatus.COMING_OUT,
		value: AnimeStatus.COMING_OUT
	},
	{
		id: 5,
		label: AnimeStatus.RECONSIDERING,
		value: AnimeStatus.RECONSIDERING
	},
	{
		id: 6,
		label: AnimeStatus.ABANDONED,
		value: AnimeStatus.ABANDONED
	}
]
