import { FC } from 'react'

import { Router } from 'components/Router'
import { useTheme } from 'hooks/useTheme'
import { useAuth } from 'hooks/useAuth'

export const App: FC = () => {
	useTheme()
	useAuth()

	return <Router />
}
