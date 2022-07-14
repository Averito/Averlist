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
		id: 0,
		name: 'Новости',
		to: '/news'
	},
	{
		id: 0,
		name: 'Рандом',
		to: '/random'
	},
	{
		id: 0,
		name: 'Галерея',
		to: '/gallery'
	}
]
