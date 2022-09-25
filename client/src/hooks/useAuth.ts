import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { averlist } from '@averlistApi/averlist'
import userStore from '@stores/user.store'

export const useAuth = () => {
	const router = useRouter()

	useEffect(() => {
		const asyncWrapper = async () => {
			try {
				const me = await averlist.users.me()

				userStore.userAuth()
				userStore.setUser(me)

				if (!getCookie('refreshToken')) return
				await averlist.auth.getAccess(getCookie('refreshToken') as string)
			} catch {
				if (!router.asPath.includes('lk')) return
				await router.push('/')
			}
		}
		asyncWrapper()
	}, [router])
}
