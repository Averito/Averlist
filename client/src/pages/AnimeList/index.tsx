import { useEffect } from 'react'
import { NextPage } from 'next'

import { Averlist } from '@averlistApi/types'
import animeListStore from '@stores/animeList.store'
import { AnimeListTable } from '@pages/AnimeList/components/AnimeListTable'

interface AnimeListProps {
	animeList: Averlist.Anime[]
}

export const AnimeList: NextPage<AnimeListProps> = ({ animeList }) => {
	useEffect(() => {
		animeListStore.setAnimeList(animeList)
	}, [])

	const pageSize = 30

	return (
		<>
			<AnimeListTable pageSize={pageSize} />
		</>
	)
}
