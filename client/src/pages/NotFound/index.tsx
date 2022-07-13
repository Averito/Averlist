import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'

import styles from './NotFound.module.scss'
import { useEffect } from 'react'

const NotFound: NextPage = () => {
	const router = useRouter()
	const { asPath } = router

	useEffect(() => {
		setTimeout(() => router.push('/'), 3000)
	}, [router])

	return (
		<>
			<Head>
				<title>Averlist | 404</title>
			</Head>
			<section className={styles.container}>
				<h1>Страница {decodeURI(asPath.slice(1))} не найдена.</h1>
				<p>Перенаправление на главную через 3 секунды...</p>
			</section>
		</>
	)
}

export default NotFound
