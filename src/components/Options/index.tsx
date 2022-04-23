import React, { FC } from 'react'

import styles from './styles.module.scss'
import { useAppSelector } from 'hooks/useAppSelector'
import { Menu } from './components/Menu'
import { Profile } from './components/Profile'
import { Security } from './components/Security'
import { ThemesSwitcher } from './components/ThemesSwitcher'

export const Options: FC = () => {
	const viewType = useAppSelector(state => state.options.viewType)

	return (
		<div className={styles.optionsWrapper}>
			<div className={styles.options}>
				<Menu />
				<div className={styles.optionsContent}>
					{viewType === 'profile' && <Profile />}
					{viewType === 'security' && <Security />}
					{viewType === 'themes' && <ThemesSwitcher />}
				</div>
			</div>
		</div>
	)
}
