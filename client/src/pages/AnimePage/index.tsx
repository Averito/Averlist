import { useRouter } from 'next/router'
import { NextPage } from 'next'

import styles from './AnimePage.module.scss'
import { Title } from '@anilibriaApi/types'

interface AnimePageProps {
	title: Title
}

export const AnimePage: NextPage<AnimePageProps> = ({ title }) => {
	const router = useRouter()

	console.log(title)
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h1>{router.query?.code}</h1>
			</div>
		</div>
	)
}
