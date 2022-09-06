import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import classnames from 'classnames'

import styles from './Header.module.scss'
import { Hamburger } from '@layouts/MainLayout/components/Header/components/Hamburger'
import { IgnorePaths } from '@utils/IgnorePaths'
import { Dropdown } from '@components/Dropdown'
import authStore from '@stores/auth.store'
import { useMenu } from '@layouts/MainLayout/components/Header/hooks/useMenu'

export const Header: FC = observer(() => {
	const router = useRouter()

	const { menuWithoutAuth } = useMenu(authStore.isAuth)

	const onClickOnTitle = () => {
		router.push('/')
	}

	const mainPage =
		router.pathname !== '/'
			? styles.containerNotMainPage
			: styles.containerMainPage

	const dropdownMenusWithoutAuth = [
		{
			id: 1,
			label: 'Регистрация',
			href: '/registration'
		},
		{
			id: 2,
			label: 'Войти',
			href: '/login'
		}
	]
	const dropdownMenusWithAuth = [
		{
			id: 1,
			label: 'Личный кабинет',
			href: '/lk'
		},
		{
			id: 2,
			label: 'Аниме список',
			href: '/lk/anime-list'
		},
		{
			id: 3,
			label: 'Мои коллекции',
			href: '/lk/collections'
		}
	]

	const dropdownMenus = authStore.isAuth
		? dropdownMenusWithAuth
		: dropdownMenusWithoutAuth

	const avatarHref = authStore.isAuth ? '/lk' : '/login'

	return (
		<IgnorePaths ignorePaths={['/registration', '/login', '/reset-password']}>
			<header className={classnames(styles.container, mainPage)}>
				<Hamburger />
				<div className={styles.containerBlock1}>
					<h1
						className={styles.title}
						data-text='Averlist'
						onClick={onClickOnTitle}
					>
						Averlist
					</h1>
					<nav>
						<ul className={styles.navList}>
							{menuWithoutAuth.map(menuItem => (
								<li key={menuItem.id}>
									<Link href={menuItem.to}>{menuItem.name}</Link>
								</li>
							))}
							<li>
								<a
									href='https://discord.gg/h7jCXJ8d6w'
									target='_blank'
									rel='noreferrer'
								>
									Дискорд
								</a>
							</li>
						</ul>
					</nav>
				</div>
				<div className={styles.containerBlock2}>
					<Dropdown options={dropdownMenus}>
						<Link href={avatarHref}>
							<a href='#'>
								<Image
									width={35}
									height={35}
									style={{ borderRadius: '50%' }}
									src={authStore.currentAvatar}
									alt='Ава'
								/>
							</a>
						</Link>
					</Dropdown>
					<p className={styles.login}>{authStore.currentName}</p>
				</div>
			</header>
		</IgnorePaths>
	)
})
