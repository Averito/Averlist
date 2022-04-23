import { FC, ReactElement } from 'react'

import styles from './styles.module.scss'
import wallpaper1 from 'assets/images/defaultLayout1.png'
import wallpaper2 from 'assets/images/defaultLayout2.png'
import { useWindowSize } from 'hooks/useWindowSize'

interface DefaultLayoutProps {
	children: ReactElement | ReactElement[]
}

export const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
	const { width } = useWindowSize()
	const isMobile = width <= 768

	return (
		<div className={styles.wrapper} id='defaultLayout'>
			<div
				className={styles.defaultLayout}
				style={{
					background: `url("${
						!isMobile && wallpaper2
					}") 100% 100%/ 450px 600px no-repeat`
				}}
			>
				<div
					className={styles.background2}
					style={{
						background: `url("${wallpaper1}") 0 100%/ 320px 420px no-repeat`
					}}
				>
					<div className={styles.content}>{children}</div>
				</div>
			</div>
		</div>
	)
}
