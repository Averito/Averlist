import { FC, MouseEventHandler, useState } from 'react'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import Link from 'next/link'

import styles from './Hamburger.module.scss'
import { menu } from '@layouts/MainLayout/components/Header/menu'

export const Hamburger: FC = () => {
	const router = useRouter()

	const [active, setActive] = useState<boolean>(false)
	const [absolute, setAbsolute] = useState<boolean>(true)

	const positionAbsolute = absolute
		? styles.hamburgerAbsolute
		: styles.hamburgerFixed
	const activeClass = active ? styles.hamburgerActive : styles.hamburgerInActive
	const toggleButtonClass = active
		? styles.toggleButtonActive
		: styles.toggleButtonInActive

	let positionTimeout: ReturnType<typeof setTimeout> | undefined
	const hamburgerClose = () => {
		clearTimeout(positionTimeout)
		setActive(!active)
		setAbsolute(false)

		if (active) {
			positionTimeout = setTimeout(() => {
				setAbsolute(true)
			}, 300)
		}
	}

	const onClickActiveButton: MouseEventHandler<HTMLDivElement> = () => {
		hamburgerClose()
	}

	const onClickOnTitle = () => {
		hamburgerClose()
		router.push('/')
	}

	const onClickMenuItem = () => {
		hamburgerClose()
		setActive(false)
	}

	return (
		<>
			<span className={styles.hamburgerPlaceholder} />
			<div
				className={classnames(styles.hamburger, activeClass, positionAbsolute)}
			>
				<aside className={styles.content}>
					<h1 className={styles.title} onClick={onClickOnTitle}>
						Averlist
					</h1>
					<nav className={styles.menuListContainer}>
						<ul className={styles.menuList}>
							{menu.map(menuItem => (
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
