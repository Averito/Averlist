import { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import dayjs from 'dayjs'

import styles from './Anime.module.scss'
import { Meta } from '@utils/Meta'
import { Title } from '@anilibriaApi/types'
import { AnimeCard } from '@components/AnimeCard'
import { Search } from '@components/Search'
import { Tag } from '@components/Tag'
import { useInput } from '@hooks/useInput'
import { useSearchTitlesQuery } from '@anilibriaApi/anilibriaRTK'
import { queryObjectByDefault } from '@anilibriaApi/anilibriaSSR'
import { QueryObject } from '@helpers/queryParamsString'
import { findAllByDisplayValue } from '@testing-library/dom'
import { Tags } from '@pages/Anime/components/Tags'

interface AnimeProps {
	years: number[]
	genres: string[]
	titleList: Title[]
}

export const Anime: NextPage<AnimeProps> = ({ years, genres, titleList }) => {
	const router = useRouter()

	const { value: searchValue, setValue: setSearchValue } = useInput()

	const queryObject: QueryObject = {
		filter: queryObjectByDefault.filter,
		limit: 44,
		year: router.query?.year ?? '',
		genres: router.query?.genres ?? ''
	}

	const { data: searchTitleList } = useSearchTitlesQuery(queryObject)

	const endedTitleList = searchTitleList?.length ? searchTitleList : titleList

	return (
		<>
			<Meta
				title='Averlist | Аниме каталог'
				description='Выбери что по нраву, мой юный господин...'
			/>
			<section className={styles.wrapper}>
				<h1 className={styles.title}>Новинки {dayjs().year()} года</h1>
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
