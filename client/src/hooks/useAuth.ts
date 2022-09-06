import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { averlist } from '@averlistApi/averlist'
import authStore from '@stores/auth.store'

export const useAuth = () => {
	const router = useRouter()

	useEffect(() => {
		const asyncWrapper = async () => {
			try {
				const me = await averlist.users.me()

				authStore.userAuth()
				authStore.setUser(me)
			} catch {
				if (router.asPath.includes('lk')) {
					router.push('/').then(() => {
						if (router.query.reload === 'true') router.push('/lk')
					})
				}
			}
		}
		asyncWrapper()
	}, [router])
}
