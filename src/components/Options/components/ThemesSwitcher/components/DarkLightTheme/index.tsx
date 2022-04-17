import { FC } from 'react'
import { Switch } from 'antd'

import styles from './styles.module.scss'
import darkThemeIcon from 'assets/icons/darkThemeIcon.png'
import lightThemeIcon from 'assets/icons/lightThemeIcon.png'
import { useAppSelector } from 'hooks/useAppSelector'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { setTheme } from 'store/reducers/landingReducer'

export const DarkLightTheme: FC = () => {
	const dispatch = useAppDispatch()
	const theme = useAppSelector(state => state.landing.theme)

	const lightDarkChecked = theme === 'light' ? true : false

	const onChangeTheme = (checked: boolean) => {
		if (checked) {
			dispatch(setTheme('light'))
		} else {
			dispatch(setTheme('dark'))
		}
	}

	return (
		<div>
			<p className={styles.themeSwitcherText}>
				Тёмная/Светлая (Эксперементально)
			</p>
			<div className={styles.themeSwitcher}>
				<img
					className={styles.darkThemeIcon}
					src={darkThemeIcon}
					alt='darkThemeIcon'
				/>
				<Switch checked={lightDarkChecked} onChange={onChangeTheme} />
				<img
					className={styles.lightThemeIcon}
					src={lightThemeIcon}
					alt='lightThemeIcon'
				/>
			</div>
		</div>
	)
}
