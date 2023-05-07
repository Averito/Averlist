import { FC } from 'react'
import Link from 'next/link'
import { Series, Title } from 'anilibria-api-wrapper'

import styles from './AnimePreview.module.scss'
import { DescriptionTag } from '@components/DescriptionTag'

interface AnimePreviewProps {
	series: Series
	title: Title
}

const ANILIBRIA_URI = process.env.NEXT_PUBLIC_ANILIBRIA_URI

export const AnimePreview: FC<AnimePreviewProps> = ({ series, title }) => {
	return (
		<div
			className={styles.wrapper}
			style={{
				background: `url("${ANILIBRIA_URI}${series?.preview}") 0 0/100% 100%`
			}}
		>
			<div className={styles.container}>
				<div className={styles.tags}>
					<DescriptionTag type='status' title={title} />
					<DescriptionTag type='string' title={title} />
					<DescriptionTag type='series' title={title} />
					<DescriptionTag type='length' title={title} />
				</div>
				<h2 className={styles.title}>
					<Link href={`/anime/${title.code}`}>{title.names.ru}</Link>
				</h2>
				<p className={styles.description}>{title.description}</p>
			</div>
		</div>
	)
}
