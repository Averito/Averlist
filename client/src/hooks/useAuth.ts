import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { averlist } from '@averlistApi/averlist'
import userStore from '@stores/user.store'
import animeListStore from '@stores/animeList.store'
import { errorToast } from '@helpers/toasts'

export const useAuth = () => {
	const router = useRouter()

	useEffect(() => {
		const asyncWrapper = async () => {
			try {
				const me = await averlist.users.me()

				userStore.userAuth()
				userStore.setUser(me)
				animeListStore.setAnimeList(me.anime_list ?? [])

				try {
					if (!getCookie('refreshToken')) return
					await averlist.auth.getAccess(getCookie('refreshToken') as string)
				} catch (e) {
					return
				}
			} catch {
				if (!router.asPath.includes('lk')) return
				await router.push('/')
			}
		}
		asyncWrapper()
	}, [router.pathname])
}
