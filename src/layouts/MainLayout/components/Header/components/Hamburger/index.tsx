import { FC } from 'react'
import classnames from 'classnames'

import styles from './styles.module.scss'
import menuWallpaper from 'assets/images/hamburgerMenuWallpaper.png'
import defaultAvatar from 'assets/icons/defaultAvatar.png'
import { routes } from 'components/Router/routes'
import { useToggle } from 'hooks/useToggle'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from 'hooks/useAppSelector'
import { logout, setRandomTitle } from 'store/reducers/landingReducer'
import { encodeAnimeName } from 'helpers/encodeAnimeName'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { MY_URI } from 'variebles'

export const Hamburger: FC = () => {
	const { value: opened, setValue: setOpened } = useToggle()

	const dispatch = useAppDispatch()
	const { login, avatar } = useAppSelector(state => state.user)
	const { randomTitle, isAuth } = useAppSelector(state => state.landing)

	const onClickLogout = () => {
		dispatch(logout())
		setOpened()
	}

	const onClickRandomAnime = () => {
		dispatch(setRandomTitle())
		setOpened()
	}

	const userAvatar = avatar ? `${MY_URI}${avatar}` : defaultAvatar
	const randomAnimeName = encodeAnimeName(randomTitle?.names?.ru)

	const closeButton = (
		<div
			className={classnames(
				styles.closeButton,
				opened ? styles.closeButtonActive : styles.closeButtonDisable
			)}
			onClick={setOpened}
		>
			<span
				className={classnames(styles.closeButtonSpans, styles.closeButtonSpan1)}
			/>
			<span
				className={classnames(styles.closeButtonSpans, styles.closeButtonSpan2)}
			/>
			<span
				className={classnames(styles.closeButtonSpans, styles.closeButtonSpan3)}
			/>
		</div>
	)

	return (
		<>
			{closeButton}
			<div
				className={classnames(
					styles.menuWrapper,
					opened ? styles.menuActive : styles.menuDisable
				)}
			>
				<div
					className={styles.menuContainer}
					style={{
						background: `url("${menuWallpaper}") 101% 105%/200px 300px no-repeat`
					}}
				>
					<div className={styles.menu}>
						<div className={styles.closeButtonInMenu}>{closeButton}</div>
						{isAuth ? (
							<img className={styles.userAvatar} src={userAvatar} alt={login} />
						) : (
							<h2 className={styles.menuTitle}>Не авторизован</h2>
						)}
						<ul className={styles.menuOptions}>
							{routes
								.filter(route => route.type === 'another')
								.map(route => (
									<li key={route.key} onClick={setOpened}>
										<NavLink to={route.route}>{route.name}</NavLink>
									</li>
								))}
							<li onClick={onClickRandomAnime}>
								<NavLink to={`/titles/${randomAnimeName}`}>
									Рандомный тайтл
								</NavLink>
							</li>
							{routes
								.filter(route => route.type === 'options')
								.map(route => (
									<li key={route.key} onClick={setOpened}>
										<NavLink to={route.route}>{route.name}</NavLink>
									</li>
								))}
							<li onClick={onClickLogout}>Выйти</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
