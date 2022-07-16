import Link from 'next/link'
import { FC } from 'react'

import styles from './AnimeSlider.module.scss'
import { Title } from '@anilibriaApi/types'
import { AnimeCard } from '@components/AnimeCard'

interface AnimeSliderProps {
	titleList: Title[]
	title: string
	href?: string
}

export const AnimeSlider: FC<AnimeSliderProps> = ({
	titleList,
	title,
	href
}) => {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>
				{href ? <Link href={href}>{title}</Link> : title}
			</h3>
			<div className={styles.slider}>
				{titleList.map(title => (
					<AnimeCard key={title.id} title={title} />
				))}
			</div>
		</div>
	)
}
