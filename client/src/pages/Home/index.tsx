import { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import Image from 'next/image'

import styles from './Home.module.scss'
import { Search } from '@features/Search'
import { anilibria, objectParamsByDefault } from '@anilibriaApi/anilibria'
import { Title, SeriesUsually, Series } from '@anilibriaApi/types'
import { seriesToSeriesUsually } from '@helpers/seriesToSeriesUsually'
import { QueryObject } from '@helpers/generateQueryParamsString'
import { MainAnimeSlider } from './ui/MainAnimeSlider'
import { AnimeSlider } from '@features/AnimeSlider'

interface HomeProps {
	updatesTitleList: Title[]
	changesTitleList: Title[]
	firstFiveTitles: Title[]
}

export const Home: NextPage<HomeProps> = ({
	updatesTitleList,
	changesTitleList,
	firstFiveTitles
}) => {
	const [search, setSearch] = useState<string>('')

	const onChangeSearch = (newValue: string) => {
		setSearch(newValue)
	}

	return (
		<div>
			<Search value={search} onChange={onChangeSearch} />
			<MainAnimeSlider titleList={firstFiveTitles} />
			<div className={styles.content}>
				<AnimeSlider titleList={updatesTitleList} title='Новинки' href='/' />
				<AnimeSlider titleList={changesTitleList} title='Последние изменённые' href='/' />
			</div>
		</div>
	)
}
