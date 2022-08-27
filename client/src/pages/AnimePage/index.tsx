import { useRouter } from 'next/router'
import { NextPage } from 'next'

import styles from './AnimePage.module.scss'
import { Series, Title } from '@anilibriaApi/types'
import { Meta } from '@utils/Meta'
import { AnimePageDesktop } from '@pages/AnimePage/components/AnimePageDesktop'
import { AnimePageMobile } from '@pages/AnimePage/components/AnimePageMobile'

interface AnimePageProps {
	title: Title
}

const ANILIBRIA_URI = process.env.NEXT_PUBLIC_ANILIBRIA_URI

export const AnimePage: NextPage<AnimePageProps> = ({ title }) => {
	const router = useRouter()

	console.log(title)
	const wrapperBackground = {
		background: `url("${ANILIBRIA_URI}${
			(title.player.playlist as Series)[1]?.preview
		}") 0 0/100% 100%`
	}
	return (
		<>
			<Meta
				title={`Averlist | ${title.names.ru}`}
				description={title.description}
			/>
			<div className={styles.wrapper} style={wrapperBackground}>
				<div className={styles.wrapperBackgroundFilter}>
					<div className={styles.container}>
						<AnimePageDesktop title={title} />
						<AnimePageMobile title={title} />
					</div>
				</div>
			</div>
		</>
	)
}
