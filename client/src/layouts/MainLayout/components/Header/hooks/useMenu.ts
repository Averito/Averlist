import { useEffect, useState } from 'react'

import userStore from '@stores/user.store'
import { Averlist } from '@averlistApi/types'

export interface MenuItem {
	id: number
	name: string
	to: string
}

const menuWithoutAuth: MenuItem[] = [
	{
		id: 0,
		name: 'Главная',
		to: '/'
	},
	{
		id: 1,
		name: 'Новости',
		to: '/news'
	},
	{
		id: 3,
		name: 'Каталог',
		to: '/anime'
	}
]

const menuWithAuth: MenuItem[] = [
	{
		id: 0,
		name: 'Личный кабинет',
		to: '/lk'
	},
	{
		id: 1,
		name: 'Главная',
		to: '/'
	},
	{
		id: 2,
		name: 'Аниме список',
		to: `/lk/anime-list?status=${Averlist.AnimeStatusQuery.ALL}`
	},
	{
		id: 4,
		name: 'Коллекции',
		to: '/lk/collections'
	},
	{
		id: 5,
		name: 'Новости',
		to: '/news'
	},
	{
		id: 3,
		name: 'Каталог',
		to: '/anime'
	}
]

export const useMenu = (isAuth: boolean) => {
	const [menus, setMenus] = useState<MenuItem[]>([])

	useEffect(() => {
		if (userStore.isAuth) return setMenus(menuWithAuth)
		setMenus(menuWithoutAuth)
	}, [isAuth])

	return { menus, menuWithAuth, menuWithoutAuth }
}
