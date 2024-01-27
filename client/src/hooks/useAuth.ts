import { useRouter } from 'next/router'
import { useEffect } from 'react'

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
			} catch {
				userStore.userNotAuth()
			}
		}
		void asyncWrapper()
	}, [router.pathname])
}
