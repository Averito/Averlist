export interface MenuItem {
	id: number
	name: string
	to: string
}

export const menu: MenuItem[] = [
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
		name: 'Аниме',
		to: '/anime'
	}
]
