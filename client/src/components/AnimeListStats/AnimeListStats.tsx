import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { FC } from 'react'

import styles from './AnimeListStats.module.scss'
import { Flex } from '@components/Flex'
import { Averlist } from '@averlistApi/types'
import { AnimeListStatsProps } from './AnimeListStats.types'
import {
	ProgressBarItem,
	ProgressItemCounter
} from '@components/AnimeListStats/components'
import AnimeStatus = Averlist.AnimeStatus
import AnimeStatusQuery = Averlist.AnimeStatusQuery

export const AnimeListStats: FC<AnimeListStatsProps> = observer(
	({ padding, backgroundColor, animeList }) => {
		return (
			<Flex
				className={styles.stats}
				backgroundColor={backgroundColor}
				padding={padding}
			>
				<Flex flexDirection='column' width='100%'>
					<Flex
						width='100%'
						justifyContent='space-between'
						flexWrap='wrap'
						alignItems='center'
					>
						<p className={classNames(styles.property, styles.viewed)}>
							Просмотрено
						</p>
						<p className={classNames(styles.property, styles.look)}>Смотрю</p>
						<p className={classNames(styles.property, styles.planned)}>
							Запланировано
						</p>
						<p className={classNames(styles.property, styles.reconsidering)}>
							Пересматриваю
						</p>
						<p className={classNames(styles.property, styles.comingOut)}>
							Выходит
						</p>
						<p className={classNames(styles.property, styles.abandoned)}>
							Заброшено
						</p>
					</Flex>
					<Flex
						className={styles.publicProgressBar}
						margin='10px 0 0 0'
						width='100%'
					>
						<ProgressBarItem
							animeStatus={AnimeStatus.VIEWED}
							animeList={animeList}
						/>
						<ProgressBarItem
							animeStatus={AnimeStatus.LOOK}
							animeList={animeList}
						/>
						<ProgressBarItem
							animeStatus={AnimeStatus.PLANNED}
							animeList={animeList}
						/>
						<ProgressBarItem
							animeStatus={AnimeStatus.RECONSIDERING}
							animeList={animeList}
						/>
						<ProgressBarItem
							animeStatus={AnimeStatus.COMING_OUT}
							animeList={animeList}
						/>
						<ProgressBarItem
							animeStatus={AnimeStatus.ABANDONED}
							animeList={animeList}
						/>
					</Flex>
					<Flex flexDirection='column' margin='10px 0 0 0'>
						<ProgressItemCounter
							animeStatus={AnimeStatus.VIEWED}
							animeList={animeList}
							href={`/lk/anime-list?status=${AnimeStatusQuery.VIEWED}`}
						/>
						<ProgressItemCounter
							animeStatus={AnimeStatus.LOOK}
							animeList={animeList}
							href={`/lk/anime-list?status=${AnimeStatusQuery.LOOK}`}
						/>
						<ProgressItemCounter
							animeStatus={AnimeStatus.PLANNED}
							animeList={animeList}
							href={`/lk/anime-list?status=${AnimeStatusQuery.PLANNED}`}
						/>
						<ProgressItemCounter
							animeStatus={AnimeStatus.RECONSIDERING}
							animeList={animeList}
							href={`/lk/anime-list?status=${AnimeStatusQuery.RECONSIDERING}`}
						/>
						<ProgressItemCounter
							animeStatus={AnimeStatus.COMING_OUT}
							animeList={animeList}
							href={`/lk/anime-list?status=${AnimeStatusQuery.COMING_OUT}`}
						/>
						<ProgressItemCounter
							animeStatus={AnimeStatus.ABANDONED}
							animeList={animeList}
							href={`/lk/anime-list?status=${AnimeStatusQuery.ABANDONED}`}
						/>
					</Flex>
				</Flex>
			</Flex>
		)
	}
)
