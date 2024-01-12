import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './AnimeCard.module.scss'
import { AnimeCardProps } from './AnimeCard.types'
import { useRouter } from 'next/router'
import animeListStore from '@stores/animeList.store'
import { getCssVarByAnimeStatus } from '@helpers/getCssVarByAnimeStatus'

export const AnimeCard: FC<AnimeCardProps> = observer(
	({ anime, showAnimeStatus = true }) => {
		const router = useRouter()
		const currentAnime = animeListStore.anilibriaAnimeList.find(
			anilibriaAnime => anilibriaAnime.anilibriaId === anime.anilibriaId
		)

		const onClickLocal = async () => {
			await router.push(`/anime/${anime.anilibriaCode}`)
		}

		return (
			<div className={styles.container} onClick={onClickLocal}>
				{showAnimeStatus && currentAnime && (
					<p
						className={styles.status}
						style={{
							background: `var(--${getCssVarByAnimeStatus(
								currentAnime.status
							)})`
						}}
					>
						{currentAnime.status}
					</p>
				)}
				<Image
					src={anime.poster || ''}
					alt='Постер'
					layout='fill'
					objectFit='cover'
					loading='lazy'
					property='false'
				/>
				<p className={styles.name}>
					<Link href={`/anime/${anime.anilibriaCode}`}>{anime.name}</Link>
				</p>
			</div>
		)
	}
)
