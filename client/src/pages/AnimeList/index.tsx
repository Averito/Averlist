import { MouseEventHandler, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import { NextPage } from 'next'

import { Averlist } from '@averlistApi/types'
import animeListStore from '@stores/animeList.store'
import { Meta } from '@components/Meta'
import { AnimeListTable } from '@pages/AnimeList/components/AnimeListTable'
import { AnimeListFilters } from '@pages/AnimeList/components/AnimeListFilters'
import { useAnimeStatusQuery } from '@pages/AnimeList/hooks/useAnimeStatusQuery'
import { useProtectedRoute } from '@hooks/useProtectedRoute'
import userStore from '@stores/user.store'

const AnimeListCreateAnimeModal = dynamic(
	() => import('./components/AnimeListCreateAnimeModal'),
	{ ssr: false }
)

interface AnimeListProps {
	animeList: Averlist.Anime[]
}

export const AnimeList: NextPage<AnimeListProps> = observer(({ animeList }) => {
	useProtectedRoute('/', userStore.isAuth)

	const [showOnlyAnilibria, setShowOnlyAnilibria] = useState<boolean>(false)
	const [searchValue, setSearchValue] = useState<string>('')

	const { selectedOption, onChangeSelect } = useAnimeStatusQuery()

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
