import Link from 'next/link'
import { FC, memo } from 'react'

import styles from './AnimeSlider.module.scss'
import { TitleCard } from '@components/TitleCard'
import { AnimeSliderProps } from './AnimeSlider.types'

export const AnimeSlider: FC<AnimeSliderProps> = memo(
	({ titleList, title, href }) => {
		return (
			<div className={styles.container}>
				<h3 className={styles.title}>
					{href ? <Link href={href}>{title}</Link> : title}
				</h3>
				<div className={styles.slider}>
					{titleList.map(title => (
						<TitleCard key={title.id} title={title} />
					))}
				</div>
			</div>
		)
	}
)
