import Link from 'next/link'
import Image from 'next/image'
import { FC, memo } from 'react'

import styles from './AnimeCard.module.scss'
import { Title } from '@anilibriaApi/types'
import { useRouter } from 'next/router'

interface AnimeCardProps {
	title: Title
}

const ANILIBRIA_URI = process.env.NEXT_PUBLIC_ANILIBRIA_URI

export const AnimeCard: FC<AnimeCardProps> = memo(({ title }) => {
	const router = useRouter()

	const toAnime = `/anime/${title.code}`
	const poster = `${ANILIBRIA_URI}${title.posters?.original?.url}`

	const onClickPoster = () => {
		router.push(toAnime)
	}

	return (
		<div className={styles.container}>
			<Image
				className={styles.poster}
				width={200}
				height={250}
				src={poster}
				alt='Картинка('
				onClick={onClickPoster}
			/>
			<div className={styles.info}>
				<p className={styles.name}>
					<Link href={toAnime}>{title.names.ru}</Link>
				</p>
				<p className={styles.description}>{title.description}</p>
			</div>
		</div>
	)
})
