import { FC } from 'react'
import Link from 'next/link'

import styles from './AnimePreview.module.scss'
import { SeriesUsually, Title } from '@anilibriaApi/types'
import { Tag } from '@features/Tag'

interface AnimePreviewProps {
	series: SeriesUsually
	title: Title
}

const ANILIBRIA_URI = process.env.NEXT_PUBLIC_ANILIBRIA_URI

export const AnimePreview: FC<AnimePreviewProps> = ({ series, title }) => {
	return (
		<div
			className={styles.container}
			style={{
				background: `url("${ANILIBRIA_URI}${series?.preview}") 0 0/100% 100%`
			}}
		>
			<div className={styles.tags}>
				<Tag type='status' title={title} />
				<Tag type='string' title={title} />
				<Tag type='series' title={title} />
				<Tag type='length' title={title} />
			</div>
			<h2 className={styles.title}>
				<Link href='/'>{title.names.ru}</Link>
			</h2>
			<p className={styles.description}>{title.description}</p>
		</div>
	)
}
