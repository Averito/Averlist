import { useEffect, useState } from 'react'
import { NextPage } from 'next'

import { Averlist } from '@averlistApi/types'
import animeListStore from '@stores/animeList.store'
import { Meta } from '@components/Meta'
import { AnimeListTable } from '@pages/AnimeList/components/AnimeListTable'
import { AnimeListFilters } from '@pages/AnimeList/components/AnimeListFilters'
import { useAnimeStatusQuery } from '@pages/AnimeList/hooks/useAnimeStatusQuery'

interface AnimeListProps {
	animeList: Averlist.Anime[]
}

export const AnimeList: NextPage<AnimeListProps> = ({ animeList }) => {
	const [searchValue, setSearchValue] = useState<string>('')
	const [showOnlyAnilibria, setShowOnlyAnilibria] = useState<boolean>(false)

	const { selectedOption, onChangeSelect } = useAnimeStatusQuery()

	useEffect(() => {
		animeListStore.setAnimeList(animeList)
	}, [])

	const pageSize = 30

	return (
		<>
			<Meta
				title='Averlist | Аниме список'
				description='Здесь живёт ваш аниме список, Господин'
			/>
			<AnimeListFilters
				searchValue={searchValue}
				onChangeSearch={setSearchValue}
				selectOption={selectedOption}
				onChangeSelect={onChangeSelect}
				showOnlyAnilibria={showOnlyAnilibria}
				onChangeShowOnlyAnilibria={setShowOnlyAnilibria}
			/>
			<AnimeListTable
				pageSize={pageSize}
				searchValue={searchValue}
				selectedStatus={selectedOption}
				showOnlyAnilibria={showOnlyAnilibria}
			/>
		</>
	)
}
