import { Routes } from './types'
import { Login } from 'components/Login'
import { Registration } from 'components/Registration'
import { RestorePassword } from 'components/RestorePassword'
import { AnimePage } from 'components/AnimePage'
import { AnimeList } from 'components/AnimeList'
import { AnimeLibrary } from 'components/AnimeLibrary'

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
		route: 'titles/:titleName',
		type: 'children',
		component: AnimePage
	}
]
