import { FC } from 'react'

import styles from './HomeDesktop.module.scss'
import { AnimeSlider } from '@components/AnimeSlider'
import { Schedule, Title } from '@anilibriaApi/types'

interface HomeDesktopProps {
	scheludeOfWeek: Schedule[]
	reversedUpdatesTitleList: Title[]
	changesTitleList: Title[]
}

export const HomeDesktop: FC<HomeDesktopProps> = ({
	scheludeOfWeek,
	changesTitleList,
	reversedUpdatesTitleList
}) => {
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
		<div className={styles.desktopContent}>
			<AnimeSlider
				titleList={reversedUpdatesTitleList}
				title='Новинки'
				href='/anime'
			/>
			<AnimeSlider
				titleList={changesTitleList}
				title='Последние изменённые'
				href='/anime'
			/>
			<div>
				<h3 className={styles.scheludeTitle}>Расписание тайтлов</h3>
				{scheludeOfWeek.map(schelude => (
					<AnimeSlider
						key={schelude.day}
						titleList={schelude.list}
						title={daysOfWeek[schelude.day]}
					/>
				))}
			</div>
		</div>
	)
}
