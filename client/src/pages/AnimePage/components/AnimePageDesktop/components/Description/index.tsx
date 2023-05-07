import { FC } from 'react'
import { Title } from 'anilibria-api-wrapper'

import styles from './Description.module.scss'

interface DescriptionProps {
	title: Title
}

export const Description: FC<DescriptionProps> = ({ title }) => {
	const duration = `${title.type.length} минуты ${
		title.type.series
			? `(${title.type.length * title.type.series} минут всего)`
			: ''
	}`

	return (
		<div>
			<h2 className={styles.aboutTitle}>Подробнее:</h2>
			<div className={styles.description}>
				<p>Кол-во серий:</p>
				<p>
					{title.player.series.first !== 1
						? title.player.series.string
						: title.player.series.last}{' '}
					из {title.type.series ?? '?'} эпизодов
					{title.announce && (
						<>
							<br />
							<span className={styles.announce}>{title.announce}</span>
						</>
					)}
				</p>
				<p>Длительность:</p>
				<p>{duration}</p>
				<p>Жанры:</p>
				<p>{title.genres.join(', ')}</p>
				{title.team.voice.join(', ') && (
					<>
						<p>Озвучивали:</p>
						<p>{title.team.voice.join(', ')}</p>
					</>
				)}
				{title.team.decor.join(', ') && (
					<>
						<p>Декор:</p>
						<p>{title.team.decor.join(', ')}</p>
					</>
				)}
				{title.team.timing.join(', ') && (
					<>
						<p>Тайминги:</p>
						<p>{title.team.timing.join(', ')}</p>
					</>
				)}
				{title.team.translator.join(', ') && (
					<>
						<p>Переводчики:</p>
						<p>{title.team.translator.join(', ')}</p>
					</>
				)}
				{title.team.editing.join(', ') && (
					<>
						<p>Едиторы:</p>
						<p>{title.team.editing.join(', ')}</p>
					</>
				)}
				<p>Заблокировано:</p>
				<p>{title.blocked.blocked ? 'Да' : 'Нет'}</p>
			</div>
		</div>
	)
}
