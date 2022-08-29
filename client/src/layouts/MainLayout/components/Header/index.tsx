import { useRouter } from 'next/router'
import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import classnames from 'classnames'

import styles from './Header.module.scss'
import defaultAvatar from '@assets/images/defaultAvatar.png'
import { Hamburger } from '@layouts/MainLayout/components/Header/components/Hamburger'
import { menu } from '@layouts/MainLayout/components/Header/menu'
import { IgnorePaths } from '@utils/IgnorePaths'
import { Dropdown } from '@components/Dropdown'

export const Header: FC = () => {
	const router = useRouter()

	const onClickOnTitle = () => {
		router.push('/')
	}

	const mainPage =
		router.pathname !== '/'
			? styles.containerNotMainPage
			: styles.containerMainPage

	const dropdownMenus = [
		{
			id: 1,
			label: 'Регистрация',
			href: 'registration'
		},
		{
			id: 2,
			label: 'Войти',
			href: 'login'
		}
	]

	return (
		<IgnorePaths ignorePaths={['/registration', '/login']}>
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
							{menu.map(menuItem => (
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
						<Link href='registration'>
							<Image
								width={35}
								height={35}
								style={{ borderRadius: '50%' }}
								src={defaultAvatar}
								alt='Ава'
							/>
						</Link>
					</Dropdown>
					<p className={styles.login}>Гость</p>
				</div>
			</header>
		</IgnorePaths>
	)
}
