import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import classnames from 'classnames'

import styles from './Header.module.scss'
import { IgnorePaths } from '@components/IgnorePaths'
import { Dropdown } from '@components/Dropdown'
import userStore from '@stores/user.store'
import { useMenu } from '@layouts/MainLayout/components/Header/hooks/useMenu'
import { Averlist } from '@averlistApi/types'
import {
	HeaderSearch,
	Hamburger
} from '@layouts/MainLayout/components/Header/components'

const NEXT_PUBLIC_DISCORD_INVITE_LINK =
	process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK

export const Header: FC = observer(() => {
	const router = useRouter()

	const { menuWithoutAuth } = useMenu(userStore.isAuth)

	const onClickOnTitle = () => {
		void router.push('/')
	}

	const mainPage =
		router.pathname !== '/'
			? styles.containerNotMainPage
			: styles.containerMainPage

	const dropdownMenusWithoutAuth = [
		{
			id: 1,
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
			href: `/lk/anime-list?status=${Averlist.AnimeStatusQuery.ALL}`
		},
		{
			id: 5,
			label: 'Выход',
			onClick: async () => {
				userStore.logout()
				await router.push('/')
			}
		}
	]

	const dropdownMenus = userStore.isAuth
		? dropdownMenusWithAuth
		: dropdownMenusWithoutAuth

	const avatarHref = userStore.isAuth ? '/lk' : '/login'

	return (
		<IgnorePaths ignorePaths={['/login']}>
			<header className={classnames(styles.container, mainPage)}>
				<Hamburger />
				<div className={styles.containerBlock1}>
					<div className={styles.containerBlock1WithSearch}>
						<a
							className={styles.title}
							data-text='Averlist'
							onClick={onClickOnTitle}
						>
							Averlist
						</a>
						<HeaderSearch />
					</div>
					<nav>
						<ul className={styles.navList}>
							{menuWithoutAuth.map(menuItem => (
								<li key={menuItem.id}>
									<Link href={menuItem.to}>{menuItem.name}</Link>
								</li>
							))}
							<li>
								<a
									href={NEXT_PUBLIC_DISCORD_INVITE_LINK}
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
									src={userStore.currentAvatar}
									alt='Ава'
								/>
							</a>
						</Link>
					</Dropdown>
				</div>
			</header>
		</IgnorePaths>
	)
})
