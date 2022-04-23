import { Routes } from './types'
import { Login } from 'pages/Login'
import { Registration } from 'pages/Registration'
import { RestorePassword } from 'pages/RestorePassword'
import { AnimePage } from 'pages/AnimePage'
import { AnimeList } from 'pages/AnimeList'
import { AnimeLibrary } from 'pages/AnimeLibrary'
import { Options } from 'pages/Options'
import { Users } from 'pages/Users'
import { UserPage } from 'pages/UserPage'

export const routes: Routes = [
	{
		key: 'login',
		name: 'Логин',
		route: '/login',
		type: 'login',
		component: Login
	},
	{
		key: 'registration',
		name: 'Регистрация',
		route: '/registration',
		type: 'registration',
		component: Registration
	},
	{
		key: 'rememberPassword',
		name: 'Забыли пароль?',
		route: '/restore-password',
		type: 'rememberPassword',
		component: RestorePassword
	},
	{
		key: 'options',
		name: 'Настройки',
		route: '/options',
		type: 'options',
		component: Options
	},
	{
		key: 'animelist',
		name: 'Аниме список',
		route: '/',
		type: 'another',
		component: AnimeList
	},
	{
		key: 'animelibrary',
		name: 'Библиотека',
		route: '/anime-library',
		type: 'another',
		component: AnimeLibrary
	},
	{
		name: 'title list',
		key: 'titleList',
		route: 'anime-library/:titleName',
		type: 'children',
		component: AnimePage
	},
	{
		name: 'Пользователи',
		key: 'users',
		route: '/users',
		type: 'another',
		component: Users
	},
	{
		name: 'user page',
		key: 'userPage',
		route: 'users/:userId',
		type: 'children',
		component: UserPage
	}
]
