import { FC, useState } from 'react'
import { ICellRendererParams } from 'ag-grid-community'

import styles from './StatusCellRenderer.module.scss'
import { Averlist } from '@averlistApi/types'
import { Button } from '@components/Button'
import { Dropdown, DropdownMenu } from '@components/Dropdown'
import { averlist } from '@averlistApi/averlist'
import animeListStore from '@stores/animeList.store'

export const StatusCellRenderer: FC<
	ICellRendererParams<Averlist.Anime, string>
> = ({ value, data, api }) => {
	const [opened, setOpened] = useState<boolean>(false)

	if (!data) return <></>

	const changeStatus = (animeId: string, status: Averlist.AnimeStatus) => {
		return async () => {
			await averlist.anime.editStatus(animeId, status)
			animeListStore.editStatus(animeId, status)
			api.setRowData(animeListStore.animeList)
		}
	}

	const dropdownOptions: DropdownMenu[] = [
		{
			id: 0,
			label: Averlist.AnimeStatus.VIEWED,
			onClick: changeStatus(data.id, Averlist.AnimeStatus.VIEWED)
		},
		{
			id: 1,
			label: Averlist.AnimeStatus.LOOK,
			onClick: changeStatus(data.id, Averlist.AnimeStatus.LOOK)
		},
		{
			id: 2,
			label: Averlist.AnimeStatus.PLANNED,
			onClick: changeStatus(data.id, Averlist.AnimeStatus.PLANNED)
		},
		{
			id: 3,
			label: Averlist.AnimeStatus.RECONSIDERING,
			onClick: changeStatus(data.id, Averlist.AnimeStatus.RECONSIDERING)
		},
		{
			id: 4,
			label: Averlist.AnimeStatus.COMING_OUT,
			onClick: changeStatus(data.id, Averlist.AnimeStatus.COMING_OUT)
		},
		{
			id: 5,
			label: Averlist.AnimeStatus.ABANDONED,
			onClick: changeStatus(data.id, Averlist.AnimeStatus.ABANDONED)
		}
	]

	const onDropdownOpen = () => {
		setOpened(true)
	}
	const onDropdownClose = () => {
		setOpened(false)
	}

	return (
		<div
			className={styles.container}
			style={{ zIndex: opened ? 1 : undefined }}
		>
			<Dropdown
				options={dropdownOptions}
				onOpen={onDropdownOpen}
				onClose={onDropdownClose}
				clickMod
			>
				<Button className={styles.button}>{value}</Button>
			</Dropdown>
		</div>
	)
}
