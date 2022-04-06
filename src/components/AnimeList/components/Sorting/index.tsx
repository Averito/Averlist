import React, { FC, useEffect, useState } from 'react'
import { AutoComplete, Col, Row, Select, Typography } from 'antd'

import styles from './styles.module.scss'
import { Table } from '../Table'
import { useAppSelector } from 'hooks/useAppSelector'
import { useDispatch } from 'react-redux'
import { sortAnimeList } from 'store/reducers/userReducer'

interface SortingProps {
	setSelectedAnime: any
}

export const Sorting: FC<SortingProps> = ({ setSelectedAnime }) => {
	const [search, setSearch] = useState<string>('')
	const [statusFilter, setStatusFilter] = useState<string>('-1')

	const dispatch = useDispatch()
	const animeList = useAppSelector(state => state.user.animeList)
	const animeListSort = useAppSelector(state => state.user.animeListSort)

	const onChangeSearch = (value: string) => {
		setSearch(value)
	}
	const onSelectName = (name: string) => {
		setSearch(name)
	}

	const onChangeStatusSelect = (value: string) => {
		setStatusFilter(value)
	}

	const autoCompleteOptions = animeList
		.map(anime => ({ value: anime.name }))
		.filter(anime => anime?.value?.includes(search))

	useEffect(() => {
		dispatch(sortAnimeList({ search, statusFilter }))
	}, [statusFilter, search, dispatch])

	return (
		<div>
			<AutoComplete
				className={styles.searchBlock}
				placeholder='Поиск'
				value={search}
				onChange={onChangeSearch}
				onSelect={onSelectName}
				options={autoCompleteOptions}
				style={{ marginBottom: '10px' }}
			/>
			<Row style={{ marginBottom: '10px' }}>
				<Col style={{ width: '100%' }}>
					<Select
						defaultValue='Не выбрано'
						style={{ width: '100%' }}
						onChange={onChangeStatusSelect}
					>
						<Select.Option value='-1'>Не выбрано</Select.Option>
						<Select.Option value='0'>Просмотренно</Select.Option>
						<Select.Option value='1'>Смотрю</Select.Option>
						<Select.Option value='2'>Запланированно</Select.Option>
						<Select.Option value='3'>Выходит</Select.Option>
						<Select.Option value='4'>Заброшено</Select.Option>
					</Select>
				</Col>
			</Row>
			{animeListSort.length !== animeList.length && (
				<Row>
					<Col>
						<Typography.Title level={3}>
							Всего аниме в фильтре: {animeListSort.length}
						</Typography.Title>
					</Col>
				</Row>
			)}
			<div>
				<Table setSelectedAnime={setSelectedAnime} />
			</div>
		</div>
	)
}
