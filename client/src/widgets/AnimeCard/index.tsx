import Link from 'next/link'
import { FC } from 'react'

import styles from './AnimeCard.module.scss'
import { Title } from '@anilibriaApi/types'

interface AnimeCardProps {
	title: Title
}

const ANILIBRIA_URI = process.env.NEXT_PUBLIC_ANILIBRIA_URI

export const AnimeCard: FC<AnimeCardProps> = ({ title }) => {
	return (
		<div>
			<div className={styles.poster} style={{ background: `url("${ANILIBRIA_URI}${title.posters.original.url}") 0 0/100% 100%` }} />
			<p className={styles.name}>
				<Link href={`/anime/${title.code}`}>
					{title.names.ru}
				</Link>
			</p>
			<p className={styles.description}>{title.description}</p>
		</div>
	)
}
