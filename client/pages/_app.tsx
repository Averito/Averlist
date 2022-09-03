import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css'

import { Layout } from '@layouts/MainLayout'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Head>
				<meta charSet='utf-8' />
				<link rel='icon' href='./favicon.ico' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='theme-color' content='#000000' />
				<meta name='author' content='Averito' />
				<meta property='og:locale' content='ru_RU' />
				<meta property='og:type' content='article' />
				<meta property='og:url' content='https://www.averlist.xyz' />
				<meta property='og:image' content='./favicon.ico' />
				<link rel='apple-touch-icon' href='./favicon.ico' />
				<link rel='manifest' href='./manifest.json' />
				<title>Averlist</title>
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default MyApp
