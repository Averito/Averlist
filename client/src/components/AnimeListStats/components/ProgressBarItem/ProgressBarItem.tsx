import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import styles from './ProgressBarItem.module.scss'
import { Flex } from '@components/Flex'
import { getPercentageAnimeStatus } from '@helpers/getPercentageAnimeStatus'
import { getCssVarByAnimeStatus } from '@helpers/getCssVarByAnimeStatus'
import { ProgressBarItemProps } from './ProgressBarItem.types'

export const ProgressBarItem: FC<ProgressBarItemProps> = observer(
	({ animeStatus, animeList }) => {
		const percentage = getPercentageAnimeStatus(animeStatus, animeList)
		const backgroundColorVar = getCssVarByAnimeStatus(animeStatus)

		return (
			<Flex
				className={styles.publicProgressBarItem}
				backgroundColor={`var(--${backgroundColorVar})`}
				width={`${percentage}%`}
			/>
		)
	}
)
