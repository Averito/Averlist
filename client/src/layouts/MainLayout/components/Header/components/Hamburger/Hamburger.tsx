import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import Link from 'next/link'

import styles from './Hamburger.module.scss'
import { useOutside } from '@hooks/useOutside'
import { useMenu } from '@layouts/MainLayout/components/Header/hooks/useMenu'
import userStore from '@stores/user.store'
import { averlist } from '@averlistApi/averlist'
import { AiOutlineSearch } from 'react-icons/ai'

const NEXT_PUBLIC_DISCORD_INVITE_LINK =
	process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK

export const Hamburger: FC = () => {
	const router = useRouter()

	const [active, setActive] = useState<boolean>(false)

	const { menus } = useMenu(userStore.isAuth)

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
		userStore.logout()
		await router.push('/')
	}

	const onClickHamburgerSearch = () => {
		void router.push('/anime')
	}

	useEffect(() => {
		document.body.style.overflow = active ? 'hidden' : 'hidden auto'
	}, [active])

	const hamburger = useRef<HTMLDivElement>(null)
	useOutside(hamburger, hamburgerClose)

	return (
		<div>
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
									href={NEXT_PUBLIC_DISCORD_INVITE_LINK}
									target='_blank'
									rel='noreferrer'
								>
									Дискорд
								</a>
							</li>
							{userStore.isAuth && <li onClick={onClickLogout}>Выйти</li>}
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
			<div className={styles.hamburgerSearch}>
				<AiOutlineSearch
					className={styles.searchIcon}
					onClick={onClickHamburgerSearch}
					size={22}
				/>
			</div>
		</div>
	)
}
