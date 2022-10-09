import { observer } from 'mobx-react-lite'
import { NextPage } from 'next'

import { Averlist } from '@averlistApi/types'
import { Table } from '@pages/AnimeList/components/Table'
import { useEffect } from 'react'
import animeListStore from '@stores/animeList.store'

interface AnimeListProps {
	animeList: Averlist.Anime[]
}

export const AnimeList: NextPage<AnimeListProps> = ({ animeList }) => {
	useEffect(() => {
		animeListStore.setAnimeList(animeList)
	}, [])

	return (
		<div>
			<Table />
			<p>Данная страница в разработке, сейчас можно только статусы глянуть и поменять, за работоспособность на телефоне пока не ебу, не проверял))</p>
		</div>
	)
}
