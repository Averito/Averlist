import { FC } from 'react'
import Head from 'next/head'

import { MetaProps } from './Meta.types'

export const Meta: FC<MetaProps> = ({
	title,
	description,
	image = '/favicon.ico'
}) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta property='og:image' content={image} />
			<meta property='og:site_name' content='Averlist' />
		</Head>
	)
}
