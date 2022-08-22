import { FC } from 'react'
import Image from 'next/image'

import styles from './AnimePageDesktop.module.scss'
import { Title } from '@anilibriaApi/types'
import { Description } from '@pages/AnimePage/components/AnimePageDesktop/components/Description'
import { StatusYearType } from '@pages/AnimePage/components/StatusYearType'
import { Button } from '@components/Button'

interface AnimePageDesktopProps {
	title: Title
}

const ANILIBRIA_URI = process.env.NEXT_PUBLIC_ANILIBRIA_URI

export const AnimePageDesktop: FC<AnimePageDesktopProps> = ({ title }) => {
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
					<Button className={styles.watchOnlineButton}>Смотреть онлайн</Button>
					{/* todo: <p>Добавить в список</p>*/}
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
				</div>
			</div>
		</div>
	)
}
