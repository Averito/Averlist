import { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import styles from './Home.module.scss'
import { anilibria, objectParamsByDefault } from '@anilibriaApi/anilibria'
import { Title, SeriesUsually, Series, Schelude } from '@anilibriaApi/types'
import { seriesToSeriesUsually } from '@helpers/seriesToSeriesUsually'
import { QueryObject } from '@helpers/generateQueryParamsString'
import { MainAnimeSlider } from './components/MainAnimeSlider'
import { AnimeSlider } from '@components/AnimeSlider'
import { reverseArray } from '@helpers/reverseArray'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { getTitleListThunk } from '@store/reducers/mainReducer/mainThunks'
import { firstSeriesToSeriesUsually } from '@helpers/firstSeriesToSeriesUsually'
import { usePropsOnClient } from '@pages/Home/hooks/usePropsOnClient'
import { AnimeCard } from '@components/AnimeCard'
import { HomeMobile } from '@pages/Home/components/HomeMobile'
import { HomeDesktop } from '@pages/Home/components/HomeDesktop'

interface HomeProps {
	updatesTitleList: Title[]
	changesTitleList: Title[]
	firstFiveTitles: Title[]
	scheludeOfWeek: Schelude[]
}

export const Home: NextPage<HomeProps> = ({
	updatesTitleList,
	changesTitleList,
	firstFiveTitles,
	scheludeOfWeek
}) => {
	const dispath = useAppDispatch()

	useEffect(() => {
		const params = {
			filter: objectParamsByDefault.filter,
			limit: -1
		}

		dispath(getTitleListThunk(params))
	}, [dispath])

	const {
		newFirstFiveTitles,
		newChangesTitleList,
		reversedUpdatesTitleList,
		newScheludeOfWeek
	} = usePropsOnClient(
		updatesTitleList,
		changesTitleList,
		firstFiveTitles,
		scheludeOfWeek
	)

	return (
		<div>
			{/* MainAnimeSlider only for desktop */}
			<MainAnimeSlider titleList={newFirstFiveTitles} />
			<HomeDesktop
				changesTitleList={newChangesTitleList}
				reversedUpdatesTitleList={reversedUpdatesTitleList}
				scheludeOfWeek={newScheludeOfWeek}
			/>
			<HomeMobile titleList={newChangesTitleList} />
		</div>
	)
}
