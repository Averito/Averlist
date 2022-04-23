import { FC } from 'react'

import styles from './styles.module.scss'
import { DarkLightTheme } from './components/DarkLightTheme'

export const ThemesSwitcher: FC = () => {
	return (
		<div className={styles.themes}>
			<DarkLightTheme />
		</div>
	)
}
