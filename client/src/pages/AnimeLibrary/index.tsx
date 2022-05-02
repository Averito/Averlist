import React, { useState, FC } from 'react'
import { Typography, Pagination } from 'antd'
import { useQuery } from 'react-query'

import styles from './styles.module.scss'
import { AnimeLibraryItem } from 'components/AnimeLibraryItem'
import { Filters } from './components/Filters'
import { useAppSelector } from 'hooks/useAppSelector'
import { Genres, Title, Years } from 'api/anilibriaApi/types'
import { anilibriaApi } from 'api'

export const AnimeLibrary: FC = () => {
	const pageSize = 20

	const titleList = useAppSelector(state => state.landing.titleList)

	const [currentPage, setCurrentPage] = useState<number>(1)
	const [search, setSearch] = useState<string>('')
	const [selectedGenres, setSelectedGenres] = useState<Genres>([])
	const [selectedYears, setSelectedYears] = useState<Years>([])

	const { data: titleListSearch } = useQuery(
		['getTitleListSearch', selectedGenres, selectedYears, search],
		() => {
			const objectParams = {
				filter: [
					'id',
					'names',
					'type',
					'posters',
					'genres',
					'description',
					'announce'
				],
				year: selectedYears.map(year => year.toString()),
				genres: selectedGenres,
				limit: -1,
				search
			}
			setCurrentPage(1)
			return anilibriaApi.searchTitles(objectParams)
		},
		{
			enabled: search.length !== 0
		}
	)

	const titleListForUsage =
		(titleListSearch?.length !== 0
			? (titleListSearch as Title[])
			: titleList) || titleList

	const onChangePagination = (page: number) => {
		setCurrentPage(page)
	}
	const onChangeSearch = (value: string) => {
		setSearch(value)
	}
	const onSelectSearch = onChangeSearch

	const onClickGenre = (genreFromArr: string, checked: boolean) => {
		const nextSelectedGenres = checked
			? [...selectedGenres, genreFromArr]
			: selectedGenres.filter(genre => genre !== genreFromArr)
		setSelectedGenres(nextSelectedGenres)
	}
	const onClickYear = (yearFromArr: number, checked: boolean) => {
		const nextSelectedYears = checked
			? [...selectedYears, yearFromArr]
			: selectedYears.filter(year => year !== yearFromArr)
		setSelectedYears(nextSelectedYears)
	}

	return (
		<div className={styles.animeLibraryWrapper}>
			<div>
				<div>
					{titleListForUsage
						?.slice(pageSize * (currentPage - 1), pageSize * currentPage)
						?.map(title => (
							<AnimeLibraryItem key={title.id} title={title} />
						))}
				</div>
				{titleListForUsage?.length !== 0 ? (
					<Pagination
						style={{ margin: '20px 0 0 0' }}
						total={Math.ceil(titleListForUsage?.length / pageSize) * 10}
						onChange={onChangePagination}
						current={currentPage}
					/>
				) : (
					<Typography.Title level={2}>
						По вашему запросу ничего не найдено
					</Typography.Title>
				)}
			</div>
			<Filters
				onClickGenre={onClickGenre}
				onClickYear={onClickYear}
				onChangeSearch={onChangeSearch}
				onSelectSearch={onSelectSearch}
				search={search}
				selectedGenres={selectedGenres}
				selectedYears={selectedYears}
			/>
		</div>
	)
}
