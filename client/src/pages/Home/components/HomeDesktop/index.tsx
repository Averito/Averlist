import { FC } from 'react'
import { Schedule, Title } from 'anilibria-api-wrapper'

import styles from './HomeDesktop.module.scss'
import { AnimeSlider } from '@components/AnimeSlider/AnimeSlider'

interface HomeDesktopProps {
	scheduleOfWeek: Schedule[]
	reversedUpdatesTitleList: Title[]
	changesTitleList: Title[]
}

export const HomeDesktop: FC<HomeDesktopProps> = ({
	scheduleOfWeek,
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
				<h3 className={styles.scheduleTitle}>Расписание тайтлов</h3>
				{scheduleOfWeek.map(schedule => (
					<AnimeSlider
						key={schedule.day}
						titleList={schedule.list}
						title={daysOfWeek[schedule.day]}
					/>
				))}
			</div>
		</div>
	)
}
