import { FC } from 'react'

import styles from './CollectionPageAnimeList.module.scss'
import { CollectionPageAnimeListProps } from './CollectionPageAnimeList.types'
import { AnimeCard } from '@components'

export const CollectionPageAnimeList: FC<CollectionPageAnimeListProps> = ({
	animeList
}) => {
	return (
		<div className={styles.container}>
			{animeList.map(anime => (
				<AnimeCard key={anime.id} anime={anime} />
			))}
		</div>
	)
}
