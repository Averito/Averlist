import { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { Title } from 'anilibria-api-wrapper'
import dayjs from 'dayjs'

import styles from './AnimeCatalog.module.scss'
import { Meta } from '@components/Meta'
import { TitleCard } from '@components/TitleCard'
import { Autocomplete } from '@components/Autocomplete/Autocomplete'
import { QueryObject } from '@helpers/queryParamsString'
import { Tags } from '@pages/AnimeCatalog/components/Tags'
import { useGetSearchTitles } from '@hooks/useGetSearchTitles'
import { useInfinityScroll } from '@hooks/useInfinityScroll'
import { useGetUpdates } from '@hooks/useGetUpdates'
import animeCatalog from '@stores/animeCatalog.store'
import { AnimeCatalogProps } from '@pages/AnimeCatalog/AnimeCatalog.types'
import { useUrlQueryParams } from '@hooks/useUrlQueryParams'

export const AnimeCatalog: NextPage<AnimeCatalogProps> = observer(
	({ years, genres, titleList }) => {
		const router = useRouter()

		const pageSize = 24

		const [searchValue, setSearchValue] = useUrlQueryParams(
			'search',
			animeCatalog.searchValue,
			value => {
				animeCatalog.setSearchValue(searchValue)
			}
		)

		const [firstRender, setFirstRender] = useState<boolean>(true)
		const [currentPage, setCurrentPage] = useState<number>(1)

		const onChangeSearchValue = async (value: string) => {
			await setSearchValue(value)
			animeCatalog.reset()
			animeCatalog.setSearchValue(value)
		}

		const searchQueryObject = useMemo<QueryObject>(
			() => ({
				filter: ['id', 'names', 'description', 'posters', 'code'],
				limit: pageSize,
				after: (currentPage - 1) * pageSize,
				search: searchValue,
				year: router.query?.year ?? '',
				genres: router.query?.genres ?? ''
			}),
			[router, currentPage, searchValue]
		)
		const updatesQueryObject = useMemo<QueryObject>(
			() => ({
				filter: ['id', 'names', 'description', 'posters', 'code'],
				limit: pageSize,
				after: (currentPage - 1) * pageSize,
				since: new Date(`01-01-${dayjs().year()}`).getDate()
			}),
			[currentPage]
		)

		useEffect(() => {
			setFirstRender(false)

			if (animeCatalog.searchValue) {
				void setSearchValue(animeCatalog.searchValue)
				return
			}
			if (animeCatalog.updatesTitleList.length >= titleList?.length) return

			animeCatalog.addToUpdatesTitleList(titleList)
		}, [titleList, firstRender])

		const [getUpdatesEnable, setGetUpdatesEnable] = useState<boolean>(false)

		useGetSearchTitles(searchQueryObject, {
			enabled: !getUpdatesEnable,
			onSuccess: (newPartOfSearchTitleList: Title[]) => {
				if (getUpdatesEnable) return
				animeCatalog.addToSearchTitleList(newPartOfSearchTitleList)
			}
		})
		useGetUpdates(updatesQueryObject, getUpdatesEnable, {
			enabled: getUpdatesEnable,
			onSuccess: (newPartOfUpdatesTitleList: Title[]) => {
				if (!getUpdatesEnable) return
				animeCatalog.addToUpdatesTitleList(newPartOfUpdatesTitleList)
			}
		})

		const onFetch = async () => {
			setCurrentPage(prevCurrentPage => prevCurrentPage + 1)
		}
		useInfinityScroll(onFetch)

		useEffect(() => {
			setCurrentPage(1)

			if (
				router.query?.years ||
				router.query?.genres ||
				searchValue.length ||
				animeCatalog.searchValue.length
			)
				return setGetUpdatesEnable(false)
			setGetUpdatesEnable(true)
		}, [router.query, searchValue])

		useEffect(() => {
			if (firstRender) return
			animeCatalog.reset()
		}, [router])

		useEffect(() => {
			if (firstRender) return
			animeCatalog.resetUpdatesTitleList()
		}, [searchValue])

		const endedTitleList = animeCatalog.searchTitleList.length
			? animeCatalog.searchTitleList
			: animeCatalog.updatesTitleList

		const autocompleteMenuList = endedTitleList.map(title => ({
			id: title.id,
			name: title.names?.ru || title.names?.en
		}))

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
							value={searchValue}
							onChange={onChangeSearchValue}
							name='search'
							placeholder='Поиск (Минимум 3 символа)'
							width='100%'
							menuList={autocompleteMenuList}
						/>
					</div>
					<div className={styles.recommendations}>
						{endedTitleList.map(title => (
							<TitleCard title={title} key={title.id} />
						))}
					</div>
				</section>
			</>
		)
	}
)
