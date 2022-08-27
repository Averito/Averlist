import { FC } from 'react'
import Image from 'next/image'

import styles from './AnimePageMobile.module.scss'
import { Title } from '@anilibriaApi/types'
import { StatusYearType } from '@pages/AnimePage/components/StatusYearType'
import { Button } from '@components/Button'
import { Description } from './components/Description'

interface AnimePageMobileProps {
	title: Title
}

const ANILIBRIA_URI = process.env.NEXT_PUBLIC_ANILIBRIA_URI

export const AnimePageMobile: FC<AnimePageMobileProps> = ({ title }) => {
	return (
		<div className={styles.mobile}>
			<div className={styles.posterWrapper}>
				<Image
					className={styles.poster}
					src={`${ANILIBRIA_URI}${title.posters?.original?.url}`}
					alt={title.names.ru}
					width={270}
					height={380}
				/>
			</div>
			<div>
				<h2 className={styles.titleName}>{title.names.ru}</h2>
				<StatusYearType
					status={title.status.string}
					year={title.season.year}
					type={title.type.string}
				/>
				<Button>Смотреть онлайн</Button>
			</div>
			<Description title={title} />
		</div>
	)
}
