import React, { FC } from 'react'
import { AutoComplete, Collapse, Tag, Typography } from 'antd'
import { useQuery } from 'react-query'

import { anilibriaApi } from 'api'
import { Genres, Years } from 'api/anilibriaApi/types'
import { useAppSelector } from 'hooks/useAppSelector'

const { CheckableTag } = Tag

interface FiltersProps {
	onClickGenre: (genreFromArr: string, checked: boolean) => unknown
	onClickYear: (yearFromArr: number, checked: boolean) => unknown
	onChangeSearch: (value: string) => unknown
	onSelectSearch: (value: string) => unknown
	search: string
	selectedGenres: Genres
	selectedYears: Years
}

export const Filters: FC<FiltersProps> = ({
	onClickGenre,
	onClickYear,
	selectedYears,
	selectedGenres,
	onSelectSearch,
	onChangeSearch,
	search
}) => {
	const { data: genres } = useQuery(['getGenres'], () =>
		anilibriaApi.getGenres()
	)
	const { data: years } = useQuery(['getYears'], () => anilibriaApi.getYears())

	const titleList = useAppSelector(state => state.landing.titleList)

	return (
		<div>
			<AutoComplete
				style={{ width: '100%' }}
				options={titleList.map(title => ({ value: title.names.ru }))}
				placeholder='Поиск'
				onChange={onChangeSearch}
				onSelect={onSelectSearch}
				value={search}
			/>
			<div>
				<Typography.Title level={4}>Фильтр по жанрам:</Typography.Title>
				<Collapse style={{ width: '100%' }}>
					<Collapse.Panel header='Жанры' key='1'>
						{genres?.map(genre => (
							<CheckableTag
								key={genre}
								checked={selectedGenres.indexOf(genre) > -1}
								onChange={checked => onClickGenre(genre, checked)}
							>
								{genre}
							</CheckableTag>
						))}
					</Collapse.Panel>
				</Collapse>
			</div>
			<div>
				<Typography.Title level={4}>Фильтр по годам:</Typography.Title>
				<Collapse style={{ width: '100%' }}>
					<Collapse.Panel header='Года' key='1'>
						{years?.map(year => (
							<CheckableTag
								key={year}
								checked={selectedYears.indexOf(year) > -1}
								onChange={checked => onClickYear(year, checked)}
							>
								{year}
							</CheckableTag>
						))}
					</Collapse.Panel>
				</Collapse>
			</div>
		</div>
	)
}
