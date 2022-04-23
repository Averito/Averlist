import { Button, Grid, Select, Table as TableAntd } from 'antd'
import { NavLink } from 'react-router-dom'

import styles from '../../styles.module.scss'
import { selectStatus, selectStatusToNumber } from 'helpers/selectStatus'
import { successMessage } from 'helpers/messages'
import { FC } from 'react'
import { useAppSelector } from 'hooks/useAppSelector'
import { Anime, Status } from 'api/myApi/anime/types'
import { encodeAnimeName } from 'helpers/encodeAnimeName'
import {
	editStatusAnimeThunk,
	removeAnimeThunk
} from 'store/reducers/userReducer/userThunks'
import { useAppDispatch } from 'hooks/useAppDispatch'

const { useBreakpoint } = Grid

const statuses = [0, 1, 2, 3, 4]

interface TableProps {
	setSelectedAnime: any
}

export const Table: FC<TableProps> = ({ setSelectedAnime }) => {
	const { md } = useBreakpoint()

	const dispatch = useAppDispatch()
	const titleList = useAppSelector(state => state.landing.titleList)
	const { animeListSort: sortedAnimeList } = useAppSelector(state => state.user)

	const onChangeStatus = async (value: string, anime: Anime) => {
		const status = selectStatusToNumber(value)

		const animeOnEdit: Anime = {
			name: anime.name,
			userId: anime.userId,
			status
		}

		dispatch(
			editStatusAnimeThunk({ anime: animeOnEdit, id: anime._id as string })
		)
	}
	const onClickDeleteAnime = (animeId: string) => {
		dispatch(removeAnimeThunk(animeId))
		successMessage('Удаление успешно!')
	}
	const columns: any = [
		{
			title: 'Название',
			dataIndex: 'name',
			key: 'name',
			width: md ? 350 : 100,
			fixed: 'left',
			sorter(a: Anime, b: Anime): number {
				if (a.name > b.name) {
					return 1
				}
				return -1
			},
			render: (name: string) => {
				const animeName = encodeAnimeName(name)
				return (
					<>
						{titleList.some(title => title.names.ru === name) ? (
							<NavLink to={`/titles/${animeName}`}>{name}</NavLink>
						) : (
							<span className={styles.nameCol}>{name}</span>
						)}
					</>
				)
			}
		},
		{
			title: 'Статус',
			dataIndex: 'status',
			key: 'status',
			width: 200,
			sorter: (a: Anime, b: Anime) => a.status - b.status,
			render: (statusI: Status, anime: Anime) => (
				<div className={styles.editStatusBlock}>
					<Select
						value={selectStatus(statusI)}
						onChange={(value: string) => onChangeStatus(value, anime)}
					>
						{statuses.map(status => (
							<Select.Option
								key={status}
								value={selectStatus(status as Status)}
							>
								{selectStatus(status as Status)}
							</Select.Option>
						))}
					</Select>
				</div>
			)
		},
		{
			title: 'Действие',
			dataIndex: '_id',
			key: '_id',
			render: (_id: string) => (
				<Button type='primary' danger onClick={() => onClickDeleteAnime(_id)}>
					Удалить
				</Button>
			)
		}
	]

	const rowSelection = {
		onChange: (selectedRows: any) => {
			setSelectedAnime(selectedRows)
		}
	}

	const dataSource = sortedAnimeList.map(animeL => ({
		...animeL,
		key: animeL._id
	}))

	return (
		<TableAntd
			rowSelection={{
				type: 'checkbox',
				...rowSelection
			}}
			scroll={{ x: md ? 690 : 450 }}
			size='small'
			dataSource={dataSource}
			columns={columns}
			pagination={{ pageSize: 30, position: ['topCenter'], size: 'default' }}
		/>
	)
}
