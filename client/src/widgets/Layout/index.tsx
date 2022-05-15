import { FC, ReactElement } from 'react'

import { Header } from '@widgets/Header'

interface LayoutProps {
	children: ReactElement
}

export const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	)
}
