import { ViewType } from 'pages/Friends/types'

export interface MenuItem {
	name: string
	viewType: ViewType
}

export const menuItems: MenuItem[] = [
	{
		name: 'Чат',
		viewType: 'chat'
	},
	{
		name: 'Список друзей',
		viewType: 'friends'
	},
	{
		name: 'Входящие',
		viewType: 'invitations'
	},
	{
		name: 'Мои заявки',
		viewType: 'myInvitations'
	}
]
