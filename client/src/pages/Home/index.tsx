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

	const daysOfWeek = [
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота',
		'Воскресенье'
	]

	return (
		<div>
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
				<div>
					<h3 className={styles.scheludeTitle}>Расписание тайтлов</h3>
					{newScheludeOfWeek.map(schelude => (
						<AnimeSlider
							key={schelude.day}
							titleList={schelude.list}
							title={daysOfWeek[schelude.day]}
						/>
					))}
				</div>
			</div>
			<div className={styles.mobileContent}>
				{newChangesTitleList.map(title => (
					<AnimeCard title={title} key={title.id} />
				))}
			</div>
		</div>
	)
}
