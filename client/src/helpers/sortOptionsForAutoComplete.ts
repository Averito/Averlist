import { Title } from 'api/anilibriaApi/types'
import { Anime } from 'api/myApi/anime/types'

export const sortOptionsForAutocomplete = (
	titleList: Title[],
	animeList: Anime[],
	search: string
) => {
	return titleList
		.map(title => ({ value: title.names.ru }))
		.filter(anime => animeList.every(anime2 => anime2.name !== anime.value))
		.filter(anime => anime.value.includes(search))
}
