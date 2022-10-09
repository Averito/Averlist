import { Observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { FC } from 'react'

import styles from './AnimePageDesktop.module.scss'
import { Description } from '@pages/AnimePage/components/AnimePageDesktop/components/Description'
import { StatusYearType } from '@pages/AnimePage/components/StatusYearType'
import { Button } from '@components/Button'
import { Dropdown, DropdownMenu } from '@components/Dropdown'
import { Title } from '@anilibriaApi/types'
import { AnimeListStats } from '@components/AnimeListStats'
import { Averlist } from '@averlistApi/types'
import userStore from '@stores/user.store'
import { useWindowSize } from '@hooks/useWindowSize'
import { TorrentDownloads } from '@pages/AnimePage/components/TorrentDownloads'

const Player = dynamic(() => import('@pages/AnimePage/components/Player'), {
	ssr: false
})

interface AnimePageDesktopProps {
	title: Title
	dropdownOptions: DropdownMenu[]
	animeList: Averlist.Anime[]
}

const ANILIBRIA_URI = process.env.NEXT_PUBLIC_ANILIBRIA_URI

const AnimePageDesktop: FC<AnimePageDesktopProps> = ({
	title,
	dropdownOptions,
	animeList
}) => {
	const { isMobile } = useWindowSize()

	if (isMobile) return <></>

	return (
		<div className={styles.desktop}>
			<div className={styles.flexTwoColumn}>
				<div>
					<Image
						className={styles.poster}
						src={`${ANILIBRIA_URI}${title.posters?.original?.url}`}
						alt={title.names.ru}
						width={270}
						height={380}
					/>
					<Observer>
						{() => (
							<>
								{userStore.isAuth && (
									<Dropdown
										options={dropdownOptions}
										margin='15px 0 0 0'
										clickMod
									>
										<Button>Добавить в список</Button>
									</Dropdown>
								)}
							</>
						)}
					</Observer>
				</div>
				<div>
					<div className={styles.names}>
						<h1 className={styles.nameRu}>{title.names.ru}</h1>
						<p className={styles.nameEn}>{title.names.en}</p>
					</div>
					<StatusYearType
						status={title.status.string}
						year={title.season.year}
						type={title.type.string}
					/>
					<Description title={title} />
					<div>
						<h2 className={styles.descriptionTitle}>Описание:</h2>
						<div className={styles.description}>{title.description}</div>
					</div>
					<Player title={title} margin='0 0 20px 0' />
					<h2 className={styles.title}>Торренты:</h2>
					<TorrentDownloads title={title} />
					<h2 className={styles.title}>Популярность среди пользователей:</h2>
					<AnimeListStats
						backgroundColor='transparent'
						padding='0'
						animeList={animeList}
					/>
				</div>
			</div>
		</div>
	)
}

export default AnimePageDesktop
