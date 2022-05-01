import { FC } from 'react'

import { Router } from 'components/Router'
import { useTheme } from 'hooks/useTheme'
import { useAuth } from 'hooks/useAuth'
import { useInvitations } from 'hooks/useInvitations'

export const App: FC = () => {
	useTheme()
	useAuth()
	useInvitations()

	return <Router />
}
