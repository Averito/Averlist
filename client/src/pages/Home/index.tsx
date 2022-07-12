import { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import styles from './Home.module.scss'
import { Search } from '@components/Search'
import { anilibria, objectParamsByDefault } from '@anilibriaApi/anilibria'
import { Title, SeriesUsually, Series } from '@anilibriaApi/types'
import { seriesToSeriesUsually } from '@helpers/seriesToSeriesUsually'
import { QueryObject } from '@helpers/generateQueryParamsString'
import { MainAnimeSlider } from './components/MainAnimeSlider'
import { AnimeSlider } from '@components/AnimeSlider'
import { reverseArray } from '@helpers/reverseArray'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { getTitleListThunk } from '@store/reducers/mainReducer/mainThunks'
import { firstSeriesToSeriesUsually } from '@helpers/firstSeriesToSeriesUsually'
import { usePropsOnClient } from '@pages/Home/hooks/usePropsOnClient'

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
	const dispath = useAppDispatch()

	const [search, setSearch] = useState<string>('')

	const onChangeSearch = (newValue: string) => {
		setSearch(newValue)
	}

	useEffect(() => {
		const params = {
			filter: objectParamsByDefault.filter,
			limit: -1
		}

		dispath(getTitleListThunk(params))
	}, [dispath])

	const { newFirstFiveTitles, newChangesTitleList, reversedUpdatesTitleList } =
		usePropsOnClient(updatesTitleList, changesTitleList, firstFiveTitles)

	return (
		<div>
			{/* Search only for mobile */}
			<Search value={search} onChange={onChangeSearch} />

			{/* MainAnimeSlider only for desktop */}
			<MainAnimeSlider titleList={newFirstFiveTitles} />
			<div className={styles.desktopContent}>
				<AnimeSlider
					titleList={reversedUpdatesTitleList}
					title='Новинки'
					href='/'
				/>
				<AnimeSlider
					titleList={newChangesTitleList}
					title='Последние изменённые'
					href='/'
				/>
			</div>
		</div>
	)
}
