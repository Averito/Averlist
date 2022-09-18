import { Averlist } from '@averlistApi/types'
import userStore from '@stores/user.store'

export const isAnimeDuplicate = (
	newAnime: Averlist.Anime | Averlist.NewAnime
) => {
	const animeList = userStore.user.anime_list
	if (!animeList) return false

	return animeList.findIndex(anime => anime.name === newAnime.name) !== -1
}
