import { FC } from 'react'
import Head from 'next/head'

interface MetaProps {
	title: string
	description?: string
}

export const Meta: FC<MetaProps> = ({ title, description }) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name='description' content={description} />
		</Head>
	)
}
