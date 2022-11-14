import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FC } from 'react'

import styles from './ProgressItemCounter.module.scss'
import { Flex } from '@components/Flex'
import { Averlist } from '@averlistApi/types'
import { getCssVarByAnimeStatus } from '@helpers/getCssVarByAnimeStatus'

interface ProgressItemCounterProps {
	animeStatus: Averlist.AnimeStatus
	animeList: Averlist.Anime[]
	href: string
}

export const ProgressItemCounter: FC<ProgressItemCounterProps> = observer(
	({ animeStatus, animeList, href }) => {
		const router = useRouter()

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
				{router.asPath.includes('/lk') ? (
					<Link href={href}>
						<p>
							<span className={styles.animeStatus}>{animeStatus}</span>
							<span className={styles.counter}>{animeStatusCount}</span>
						</p>
					</Link>
				) : (
					<p>
						<span className={styles.animeStatus}>{animeStatus}</span>
						<span className={styles.counter}>{animeStatusCount}</span>
					</p>
				)}
			</Flex>
		)
	}
)
