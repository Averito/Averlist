import { Averlist } from '@averlistApi/types'

const animeStatuses: string[] = [
	'Просмотрено',
	'Смотрю',
	'Запланировано',
	'Пересматриваю',
	'Заброшено',
	'Выходит'
]
const cssVars: string[] = [
	'viewed',
	'look',
	'planned',
	'reconsidering',
	'abandoned',
	'coming-out'
]

export const getCssVarByAnimeStatus = (animeStatus: Averlist.AnimeStatus) => {
	let cssVar = ''

	for (const enumValue in animeStatuses) {
		if (animeStatuses[enumValue] === animeStatus) {
			cssVar = cssVars[enumValue]
			break
		}
	}

	return cssVar
}
