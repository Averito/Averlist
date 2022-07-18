import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { NextPage } from 'next'

import styles from './NotFound.module.scss'
import { Meta } from '@utils/Meta'

const NotFound: NextPage = () => {
	const router = useRouter()
	const { asPath } = router

	useEffect(() => {
		setTimeout(() => router.push('/'), 3000)
	}, [router])

	return (
		<>
			<Meta title='Averlist | 404' description='Страница не найдена' />
			<section className={styles.container}>
				<h1>Страница {decodeURI(asPath.slice(1))} не найдена.</h1>
				<p>Перенаправление на главную через 3 секунды...</p>
			</section>
		</>
	)
}

export default NotFound
