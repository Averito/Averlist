import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { averlist } from '@averlistApi/averlist'
import userStore from '@stores/user.store'
import animeListStore from '@stores/animeList.store'
import collectionsStore from '@stores/collections.store'
import favoriteCollectionsStore from '@stores/favoriteCollections.store'

export const useAuth = () => {
	const router = useRouter()

	useEffect(() => {
		const asyncWrapper = async () => {
			const me = await averlist.users.me()

			userStore.userAuth()
			userStore.setUser(me)
			animeListStore.setAnimeList(me.anime_list ?? [])
			collectionsStore.setCollections(me.collections ?? [])
			favoriteCollectionsStore.setCollections(me.favoriteCollections ?? [])

			try {
				if (!getCookie('refreshToken')) return
				await averlist.auth.getAccess(getCookie('refreshToken') as string)
			} catch (e) {
				return
			}
		}
		void asyncWrapper()
	}, [router.pathname])
}
