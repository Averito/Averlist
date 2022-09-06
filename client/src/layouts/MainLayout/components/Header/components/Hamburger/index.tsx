import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import Link from 'next/link'

import styles from './Hamburger.module.scss'
import { useOutside } from '@hooks/useOutside'
import { useMenu } from '@layouts/MainLayout/components/Header/hooks/useMenu'
import authStore from '@stores/auth.store'
import { averlist } from '@averlistApi/averlist'

export const Hamburger: FC = () => {
	const router = useRouter()

	const [active, setActive] = useState<boolean>(false)

	const { menus } = useMenu(authStore.isAuth)

	const activeClass = active ? styles.hamburgerActive : styles.hamburgerInActive
	const hamburgerBackgroundActive = active
		? styles.hamburgerBackgroundActive
		: styles.hamburgerBackgroundInActive
	const toggleButtonClass = active
		? styles.toggleButtonActive
		: styles.toggleButtonInActive

	const hamburgerClose = () => {
		setActive(false)
	}

	const onClickActiveButton: MouseEventHandler<HTMLDivElement> = event => {
		if (!active) event.stopPropagation()
		setActive(!active)
	}

	const onClickOnTitle = () => {
		hamburgerClose()
		router.push('/')
	}

	const onClickMenuItem: MouseEventHandler<HTMLLIElement> = () => {
		hamburgerClose()
		setActive(false)
	}

	const onClickLogout: MouseEventHandler<HTMLLIElement> = async () => {
		await averlist.auth.logout()
		authStore.logout()
		await router.push('/')
	}

	useEffect(() => {
		document.body.style.overflow = active ? 'hidden' : 'hidden auto'
	}, [active])

	const hamburger = useRef<HTMLDivElement>(null)
	useOutside(hamburger, hamburgerClose)

	return (
		<>
			<span className={styles.hamburgerPlaceholder} />
			<div
				className={classnames(
					styles.hamburgerBackground,
					hamburgerBackgroundActive
				)}
			/>
			<div className={classnames(styles.hamburger, activeClass)}>
				<aside ref={hamburger} className={styles.content}>
					<h1 className={styles.title} onClick={onClickOnTitle}>
						Averlist
					</h1>
					<nav className={styles.menuListContainer}>
						<ul className={styles.menuList}>
							{menus.map(menuItem => (
								<li onClick={onClickMenuItem} key={menuItem.id}>
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
							{authStore.isAuth && <li onClick={onClickLogout}>Выйти</li>}
						</ul>
					</nav>
				</aside>
				<div
					className={styles.toggleButtonContainer}
					onClick={onClickActiveButton}
				>
					<div className={classnames(styles.toggleButton, toggleButtonClass)}>
						<span />
						<span />
						<span />
					</div>
				</div>
			</div>
		</>
	)
}
