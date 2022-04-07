import React, { ReactElement } from 'react'
import { Layout } from 'antd'

import styles from './styles.module.scss'
import { Header } from './components/Header'
import { useWindowSize } from 'hooks/useWindowSize'
import { Breadcrumb } from './components/Breadcrumb'

const { Content } = Layout

interface MainLayoutProps {
	children: ReactElement | ReactElement[]
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const { width } = useWindowSize()
	const isMobile = width <= 768

	return (
		<Layout className='layout'>
			<Header />
			<Content>
				<div className={styles.siteLayoutСontent}>
					{!isMobile && <Breadcrumb />}
					{children}
				</div>
			</Content>
		</Layout>
	)
}
