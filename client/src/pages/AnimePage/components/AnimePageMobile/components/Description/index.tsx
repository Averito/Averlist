import { FC } from 'react'

import styles from './Description.module.scss'
import { Title } from '@anilibriaApi/types'

interface DescriptionProps {
	title: Title
}

export const Description: FC<DescriptionProps> = ({ title }) => {
	return (
		<div className={styles.descriptionWrapper}>
			<h2 className={styles.descriptionTitle}>Подробнее:</h2>
			<div className={styles.description}>
				<div className={styles.block}>
					<p className={styles.label}>Английское название:</p>
					<p className={styles.labelValue}>{title.names.en}</p>
				</div>
				<div className={styles.gridBlock}>
					<div>
						<p className={styles.label}>Кол-во серий:</p>
						<p className={styles.labelValue}>
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
					</div>
					<div>
						<p className={styles.label}>Длительность:</p>
						<p className={styles.labelValue}>
							{title.type.length} минуты (
							{title.type.length * title.type.series} минут всего)
						</p>
					</div>
				</div>
				<div className={styles.block}>
					<p className={styles.label}>Жанры:</p>
					<p className={styles.labelValue}>{title.genres.join(', ')}</p>
				</div>
				{title.team.voice.join(', ') && (
					<div className={styles.block}>
						<p className={styles.label}>Озвучивали:</p>
						<p className={styles.labelValue}>{title.team.voice.join(', ')}</p>
					</div>
				)}
				{title.team.decor.join(', ') && (
					<div className={styles.block}>
						<p className={styles.label}>Декор:</p>
						<p className={styles.labelValue}>{title.team.decor.join(', ')}</p>
					</div>
				)}
				{title.team.timing.join(', ') && (
					<div className={styles.block}>
						<p className={styles.label}>Тайминги:</p>
						<p className={styles.labelValue}>{title.team.timing.join(', ')}</p>
					</div>
				)}
				{title.team.translator.join(', ') && (
					<div className={styles.block}>
						<p className={styles.label}>Переводчики:</p>
						<p className={styles.labelValue}>
							{title.team.translator.join(', ')}
						</p>
					</div>
				)}
				{title.team.editing.join(', ') && (
					<div className={styles.block}>
						<p className={styles.label}>Едиторы:</p>
						<p className={styles.labelValue}>{title.team.editing.join(', ')}</p>
					</div>
				)}
				<div className={styles.block}>
					<p className={styles.label}>Заблокировано:</p>
					<p className={styles.labelValue}>
						{title.blocked.blocked ? 'Да' : 'Нет'}
					</p>
				</div>
			</div>
		</div>
	)
}
