import { Typography } from 'antd'
import React, { FC } from 'react'

import styles from './styles.module.scss'
import { ANILIBRIA_URI } from 'variebles'
import { useWindowSize } from 'hooks/useWindowSize'
import { DescriptionMobile } from '../DescriptionMobile'
import { AddToList } from 'components/AddToList'
import { Status } from 'api/myApi/anime/types'
import { Title } from 'api/anilibriaApi/types'
import { Player } from '../Player'

interface AnimePageMobileProps {
	titleMain: Title
	currentStatus: Status | -1
}

export const AnimePageMobile: FC<AnimePageMobileProps> = ({
	titleMain,
	currentStatus
}) => {
	const { width } = useWindowSize()

	const randomHeaderBackground = () => {
		const color = [
			'#cc0000',
			'#ff00ff',
			'#660066',
			'#3333ff',
			'#00ffcc',
			'#00ff00',
			'#99cc00',
			'#ff9900',
			'#ff9999',
			'#6600cc'
		]
		const randomIdx = Math.floor(Math.random() * 10)
		return color[randomIdx]
	}

	const background = randomHeaderBackground()
	const heightAdaptive =
		width <= 612 ? (width <= 440 ? (width <= 346 ? 120 : 150) : 200) : 300

	return (
		<div className={styles.wrapper}>
			<div className={styles.header} style={{ background }} />
			<div className={styles.mainInfo}>
				<img
					className={styles.poster}
					height={150}
					src={ANILIBRIA_URI + titleMain?.posters?.small?.url}
					alt='Не загрузилось('
				/>
				{width <= 400 ? (
					<>
						<Typography.Paragraph
							className={styles.ruTitle}
							style={{ fontWeight: 600, margin: 0, background, color: 'white' }}
						>
							{titleMain?.names?.ru}
						</Typography.Paragraph>
					</>
				) : (
					<>
						<Typography.Title
							className={styles.ruTitle}
							style={{ color: 'white', margin: 0, background }}
							level={5}
						>
							{titleMain?.names?.ru}
						</Typography.Title>
					</>
				)}
			</div>
			<hr className={styles.blueLine} />
			<div>
				<AddToList animeName={titleMain?.names?.ru} />
			</div>
			{width <= 400 ? (
				<>
					<Typography.Paragraph
						className={styles.enTitle}
						style={{ fontWeight: 600 }}
					>
						{titleMain?.names?.en}
					</Typography.Paragraph>
				</>
			) : (
				<>
					<Typography.Title className={styles.enTitle} level={5}>
						{titleMain?.names?.en}
					</Typography.Title>
				</>
			)}
			<DescriptionMobile titleMain={titleMain} status={currentStatus} />
			<hr className={styles.blueLine} />
			<div className={styles.description}>{titleMain?.description}</div>
			<div className={styles.player}>
				<Player
					titleMain={titleMain}
					width={width - 80}
					height={heightAdaptive}
				/>
			</div>
		</div>
	)
}
