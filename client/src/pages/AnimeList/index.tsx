import { MouseEventHandler, useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import { NextPage } from 'next'

import { Averlist } from '@averlistApi/types'
import animeListStore from '@stores/animeList.store'
import { Meta } from '@components/Meta'
import { AnimeListTable } from '@pages/AnimeList/components/AnimeListTable'
import { AnimeListFilters } from '@pages/AnimeList/components/AnimeListFilters'
import { useAnimeStatusQuery } from '@pages/AnimeList/hooks/useAnimeStatusQuery'
import { useUrlQueryParams } from '@hooks/useUrlQueryParams'

const AnimeListCreateAnimeModal = dynamic(
	() => import('./components/AnimeListCreateAnimeModal'),
	{ ssr: false }
)

interface AnimeListProps {
	animeList: Averlist.Anime[]
}

export const AnimeList: NextPage<AnimeListProps> = observer(({ animeList }) => {
	const [showOnlyAnilibria, setShowOnlyAnilibria] = useState<boolean>(false)

	const { selectedOption, onChangeSelect } = useAnimeStatusQuery()

	const [searchValue, updateSearchValue] = useUrlQueryParams(
		'search',
		'',
		async initialValue => {
			if (animeListStore.searchValue)
				return await updateSearchValue(animeListStore.searchValue)
			animeListStore.searchValue = initialValue
		}
	)

	const setSearchValue = async (value: string) => {
		await updateSearchValue(value)
		animeListStore.searchValue = value
	}

	const [createAnimeModalOpened, setCreateAnimeModalOpened] =
		useState<boolean>(false)
	const closeCreateAnimeModal = () => {
		setCreateAnimeModalOpened(false)
	}
	const openCreateAnimeModal: MouseEventHandler<HTMLButtonElement> = event => {
		event.stopPropagation()
		setCreateAnimeModalOpened(true)
	}

	useEffect(() => {
		animeListStore.setAnimeList(animeList)
	}, [])

	const filtered = animeListStore.animeList
		.filter(anime => (showOnlyAnilibria ? !!anime?.anilibriaId : true))
		.filter(anime =>
			selectedOption.value ? anime.status === selectedOption.value : true
		)
		.filter(anime => anime.name.includes(searchValue))
	const filteredAnimeList = filtered.length ? filtered : animeList

	const pageSize = 10

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
				autocompleteMenus={filteredAnimeList}
				openCreateAnimeModal={openCreateAnimeModal}
			/>
			<AnimeListCreateAnimeModal
				opened={createAnimeModalOpened}
				onClose={closeCreateAnimeModal}
			/>
			<AnimeListTable
				pageSize={pageSize}
				filteredAnimeList={filteredAnimeList}
			/>
		</>
	)
})
