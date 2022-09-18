import { Averlist } from '@averlistApi/types'
import userStore from '@stores/user.store'

export const getPercentageAnimeStatus = (
	animeStatus: Averlist.AnimeStatus,
	animeList = userStore.user.anime_list || []
) => {
	const filteredAnimeList = animeList?.filter(
		anime => anime.status === animeStatus
	)

	return (filteredAnimeList.length / animeList.length) * 100
}
