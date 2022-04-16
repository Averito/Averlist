import { useEffect } from 'react'

import { useAppSelector } from './useAppSelector'
import { lightTheme } from 'themes/lightTheme'
import { darkTheme } from 'themes/darkTheme'

export const useTheme = () => {
	const theme = useAppSelector(state => state.landing.theme)

	useEffect(() => {
		if (theme === 'light') {
			for (const key in lightTheme) {
				document.documentElement.style.setProperty(`--${key}`, lightTheme[key])
			}
		}
		if (theme === 'dark') {
			for (const key in darkTheme) {
				document.documentElement.style.setProperty(`--${key}`, darkTheme[key])
			}
		}
	}, [theme])
}
