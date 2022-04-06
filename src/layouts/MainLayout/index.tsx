import { Layout } from 'antd'
import React, { ReactElement } from 'react'

import styles from './styles.module.scss'
import { Header } from './components/Header'

const { Content } = Layout

interface MainLayoutProps {
	children: ReactElement | ReactElement[]
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<Layout className='layout'>
			<Header />
			<Content>
				<div className={styles.siteLayoutСontent}>{children}</div>
			</Content>
		</Layout>
	)
}
