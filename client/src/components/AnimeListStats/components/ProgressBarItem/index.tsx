import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import styles from './ProgressBarItem.module.scss'
import { Flex } from '@components/Flex'
import { Averlist } from '@averlistApi/types'
import { getPercentageAnimeStatus } from '@helpers/getPercentageAnimeStatus'
import { getCssVarByAnimeStatus } from '@helpers/getCssVarByAnimeStatus'

interface ProgressBarItemProps {
	animeStatus: Averlist.AnimeStatus
	animeList: Averlist.Anime[]
}

export const ProgressBarItem: FC<ProgressBarItemProps> = observer(
	({ animeStatus, animeList }) => {
		const percentage = getPercentageAnimeStatus(animeStatus, animeList)
		const backgroundColorVar = getCssVarByAnimeStatus(animeStatus)

		return (
			<Flex
				customClassName={styles.publicProgressBarItem}
				backgroundColor={`var(--${backgroundColorVar})`}
				width={`${percentage}%`}
			/>
		)
	}
)
