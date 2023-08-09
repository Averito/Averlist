import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useObserver } from 'mobx-react-lite'

import { averlist } from '@averlistApi/averlist'
import userStore from '@stores/user.store'
import animeListStore from '@stores/animeList.store'

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
				userStore.userNotAuth()
			}
		}
		void asyncWrapper()
	}, [router.pathname])
}
