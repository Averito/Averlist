import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import styles from './ProgressItemCounter.module.scss'
import { Flex } from '@components/Flex'
import { Averlist } from '@averlistApi/types'
import { getCssVarByAnimeStatus } from '@helpers/getCssVarByAnimeStatus'

interface ProgressItemCounterProps {
	animeStatus: Averlist.AnimeStatus
	animeList: Averlist.Anime[]
}

export const ProgressItemCounter: FC<ProgressItemCounterProps> = observer(
	({ animeStatus, animeList }) => {
		const animeStatusCount = animeList.filter(
			anime => anime.status === animeStatus
		).length

		const backgroundColorVar = getCssVarByAnimeStatus(animeStatus)

		return (
			<Flex alignItems='center' margin='10px 0 0 0'>
				<Flex
					customClassName={styles.animeStatusColor}
					backgroundColor={`var(--${backgroundColorVar})`}
				/>
				<p className={styles.animeStatus}>
					{animeStatus}{' '}
					<span className={styles.counter}>{animeStatusCount}</span>
				</p>
			</Flex>
		)
	}
)
