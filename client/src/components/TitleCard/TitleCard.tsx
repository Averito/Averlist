import { FC, memo } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import styles from './TitleCard.module.scss'
import { TitleCardProps } from './TitleCard.types'

const ANILIBRIA_URI = process.env.NEXT_PUBLIC_ANILIBRIA_URI

export const TitleCard: FC<TitleCardProps> = memo(({ title }) => {
	const router = useRouter()

	const toAnime = `/anime/${title.code}`
	const poster = `${ANILIBRIA_URI}${title.posters?.original?.url}`

	const onClickPoster = () => {
		void router.push(toAnime)
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
