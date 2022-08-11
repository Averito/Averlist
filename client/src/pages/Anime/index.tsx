import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import dayjs from 'dayjs'

import styles from './Anime.module.scss'
import { Meta } from '@utils/Meta'
import { Title } from '@anilibriaApi/types'
import { AnimeCard } from '@components/AnimeCard'
import { Search } from '@components/Search'
import { useInput } from '@hooks/useInput'
import { queryObjectByDefault } from '@anilibriaApi/anilibria'
import { QueryObject } from '@helpers/queryParamsString'
import { Tags } from '@pages/Anime/components/Tags'
import { useGetSearchTitles } from '@hooks/useGetSearchTitles'

interface AnimeProps {
	years: number[]
	genres: string[]
	titleList: Title[]
}

export const Anime: NextPage<AnimeProps> = ({ years, genres, titleList }) => {
	const router = useRouter()

	const { value: searchValue, setValue: setSearchValue } = useInput()

	const queryObject: QueryObject = useMemo(
		() => ({
			filter: queryObjectByDefault.filter,
			limit: 44,
			year: router.query?.year ?? '',
			genres: router.query?.genres ?? ''
		}),
		[router]
	)

	const { data: searchTitleList } = useGetSearchTitles(queryObject)

	const endedTitleList = useMemo(
		() => (searchTitleList?.length ? searchTitleList : titleList),
		[titleList, searchTitleList]
	)
	const currentYear = useMemo(() => dayjs().year(), [])

	return (
		<>
			<Meta
				title='Averlist | Аниме каталог'
				description='Выбери что по нраву, мой юный господин...'
			/>
			<section className={styles.wrapper}>
				<h1 className={styles.title}>Новинки {currentYear} года</h1>
				<Tags years={years} genres={genres} />
				<div className={styles.searchBlock}>
					<Search
						value={searchValue}
						onChange={setSearchValue}
						placeholder='Поиск не доделан'
					/>
				</div>
				<div className={styles.recommendations}>
					{endedTitleList.map(title => (
						<AnimeCard title={title} key={title.id} />
					))}
				</div>
			</section>
		</>
	)
}
