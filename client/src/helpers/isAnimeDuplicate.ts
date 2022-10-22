import { Averlist } from '@averlistApi/types'
import animeListStore from '@stores/animeList.store'

export const isAnimeDuplicate = (
	newAnime: Averlist.Anime | Averlist.NewAnime
) => {
	const animeList = animeListStore.animeList
	if (!animeList) return false

	return !!animeList.find(anime => anime.name === newAnime.name)
}
