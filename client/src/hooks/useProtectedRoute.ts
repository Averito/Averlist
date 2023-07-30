import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useObserver } from 'mobx-react-lite'

import userStore from '@stores/user.store'

export const useProtectedRoute = (redirectPath: string, access: boolean) => {
	const router = useRouter()

	const isAuth = useObserver(() => userStore.isAuth)

	useEffect(() => {
		const route = router.route

		if (access || isAuth) return

		userStore.setPath(route)
		void router.push(redirectPath)
	}, [isAuth])
}
