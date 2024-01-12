import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NextPage } from 'next'

import styles from './AnimeCatalog.module.scss'
import { Meta } from '@components/Meta'
import { TitleCard } from '@components/TitleCard'
import { Autocomplete } from '@components/Autocomplete/Autocomplete'
import { Tags } from '@pages/AnimeCatalog/components/Tags'
import { AnimeCatalogProps } from '@pages/AnimeCatalog/AnimeCatalog.types'
import { useUrlQueryParams } from '@hooks/useUrlQueryParams'
import { AutocompleteMenu } from '@components/Autocomplete'
import {
	Title,
	anilibriaSearchTitles,
	getAnilibriaUpdates
} from 'anilibria-api-wrapper'
import { useInfinityScroll } from '@hooks/useInfinityScroll'
import { queryObjectByDefault } from '@anilibriaApi/anilibria'
import { PAGE_SIZE } from '@pages/AnimeCatalog/AnimeCatalog.config'
import { uniqueIds } from '@helpers/uniqueIds'

export const AnimeCatalog: NextPage<AnimeCatalogProps> = ({
	years,
	genres,
	titleList
}) => {
	const router = useRouter()

	const [searchFromUrl, setSearchFromUrl] = useUrlQueryParams(
		'search',
		String(router.query?.search || '')
	)

	const [searchTitleList, setSearchTitleList] = useState<Title[]>([])
	const [updatesTitleList, setUpdatesTitleList] = useState<Title[]>(titleList)
	const [currentPage, setCurrentPage] = useState<number>(1)

	const onInfinityScroll = useCallback(() => {
		setCurrentPage(prevState => prevState + 1)
	}, [setCurrentPage])

	useInfinityScroll(onInfinityScroll)

	const searchValueTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
	const onChangeSearchValue = (value: string) => {
		if (searchValueTimer.current) clearTimeout(searchValueTimer.current)

		setSearchFromUrl(value)

		searchValueTimer.current = setTimeout(() => {
			setCurrentPage(1)
		}, 500)
	}

	const searchActive =
		searchFromUrl.length >= 3 || router.query.year || router.query.genre
	const titles = searchActive ? searchTitleList : updatesTitleList

	useEffect(() => {
		setCurrentPage(1)
	}, [router.query.years, router.query.genre])

	useEffect(() => {
		if (!searchActive) return

		const selectedYears = ((router.query?.years as string) || '').split(',')
		const selectedGenres = ((router.query?.genre as string) || '').split(',')

		const asyncWrapper = async () => {
			const newTitles = await anilibriaSearchTitles({
				filter: queryObjectByDefault.filter as string[],
				limit: PAGE_SIZE,
				year: selectedYears,
				genres: selectedGenres,
				search: searchFromUrl
			})

			setSearchTitleList(newTitles.data)
		}

		void asyncWrapper()
	}, [searchFromUrl, router.query.years, router.query.genre])

	useEffect(() => {
		if (!searchActive) return

		const selectedYears = ((router.query?.years as string) || '').split(',')
		const selectedGenres = ((router.query?.genre as string) || '').split(',')

		const asyncWrapper = async () => {
			const titles = await anilibriaSearchTitles({
				filter: queryObjectByDefault.filter as string[],
				limit: PAGE_SIZE,
				after: PAGE_SIZE * (currentPage - 1),
				year: selectedYears,
				genres: selectedGenres,
				search: searchFromUrl
			})

			setSearchTitleList(prevState =>
				currentPage === 1
					? titles.data
					: uniqueIds([...prevState, ...titles.data])
			)
		}

		void asyncWrapper()
	}, [currentPage, router.query.years, router.query.genre])

	useEffect(() => {
		if (searchActive) return

		const asyncWrapper = async () => {
			const titles = await getAnilibriaUpdates({
				filter: queryObjectByDefault.filter as string[],
				limit: PAGE_SIZE,
				after: PAGE_SIZE * (currentPage - 1)
			})

			setUpdatesTitleList(prevState =>
				currentPage === 1
					? titles.data
					: uniqueIds([...prevState, ...titles.data])
			)
		}

		void asyncWrapper()
	}, [currentPage])

	const autocompleteMenuList: AutocompleteMenu[] = useMemo(
		() =>
			(titles || [])
				.filter(
					title =>
						title.names.ru.includes(searchFromUrl) ||
						title.names.en.includes(searchFromUrl)
				)
				.map(title => ({ id: title.id, name: title.names.ru })),
		[searchFromUrl]
	)

	return (
		<>
			<Meta
				title='Averlist | Аниме каталог'
				description='Выбери что по нраву, мой юный господин...'
			/>
			<section className={styles.wrapper}>
				<h1 className={styles.title}>Каталог</h1>
				<Tags years={years} genres={genres} />
				<div className={styles.searchBlock}>
					<Autocomplete
						value={searchFromUrl}
						onChange={onChangeSearchValue}
						name='search'
						placeholder='Поиск (Минимум 3 символа)'
						width='100%'
						menuList={autocompleteMenuList}
					/>
				</div>
				<div className={styles.recommendations}>
					{titles.map(title => (
						<TitleCard title={title} key={title.id} />
					))}
				</div>
			</section>
		</>
	)
}
