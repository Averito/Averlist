import '../styles/globals.css'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'

import { Layout } from '@layouts/MainLayout'
import { store } from '../store'
import 'swiper/css'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Head>
				<meta charSet='utf-8' />
				<link rel='icon' href='./favicon.ico' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='theme-color' content='#000000' />
				<meta name='author' content='Averito' />
				<meta
					name='description'
					content='Смотри своё любимое аниме вместе с друзьями!'
				/>
				<meta property='og:locale' content='ru_RU' />
				<meta property='og:type' content='article' />
				<meta property='og:title' content='Averlist' />
				<meta
					property='og:description'
					content='Смотри своё любимое аниме вместе с друзьями!'
				/>
				<meta property='og:url' content='https://www.averlist.xyz' />
				<meta property='og:image' content='./favicon.ico' />
				<meta property='og:site_name' content='Averlist' />
				<link rel='apple-touch-icon' href='./favicon.ico' />
				<link rel='manifest' href='./manifest.json' />
				<title>Averlist</title>
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	)
}

export default MyApp
