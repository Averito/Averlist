import { FC } from 'react'
import { Dropdown, Typography, Menu } from 'antd'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'
import defaultAvatar from 'assets/icons/defaultAvatar.png'
import { Hamburger } from './components/Hamburger'
import { routes } from 'components/Router/routes'
import { useWindowSize } from 'hooks/useWindowSize'
import { useAppSelector } from 'hooks/useAppSelector'
import { logout, setRandomTitle } from 'store/reducers/landingReducer'
import { encodeAnimeName } from 'helpers/encodeAnimeName'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { MY_URI } from 'variebles'

export const Header: FC = () => {
	const { width } = useWindowSize()
	const isMobile = width <= 768

	const dispatch = useAppDispatch()
	const { randomTitle, isAuth } = useAppSelector(state => state.landing)
	const { avatar, login } = useAppSelector(state => state.user)

	const onClickLogout = () => {
		dispatch(logout())
	}

	const onClickRandomAnime = () => {
		dispatch(setRandomTitle())
	}

	const Account = (
		<Menu>
			{routes
				.filter(route => route.type === 'options')
				.map(route => (
					<Menu.Item key={route.key}>
						<Link to={route.route}>{route.name}</Link>
					</Menu.Item>
				))}
			<Menu.Item key='logout' onClick={onClickLogout}>
				Выйти
			</Menu.Item>
		</Menu>
	)

	const userAvatar = avatar ? `${MY_URI}${avatar}` : defaultAvatar
	const randomAnimeName = encodeAnimeName(randomTitle?.names?.ru)

	return (
		<header className={styles.header}>
			<div className={styles.headerItem1}>
				<Typography.Title level={4} style={{ color: 'white', margin: 0 }}>
					Averlist
				</Typography.Title>
			</div>
			{isMobile ? (
				<Hamburger />
			) : (
				<>
					<div className={styles.headerItem2}>
						<Menu mode='horizontal' theme='dark'>
							{routes
								.filter(route => route.type === 'another')
								.map(route => (
									<Menu.Item key={route.key}>
										<Link to={route.route}>{route.name}</Link>
									</Menu.Item>
								))}
							<Menu.Item key='random-title' onClick={onClickRandomAnime}>
								<Link to={`/titles/${randomAnimeName}`}>Рандомный тайтл</Link>
							</Menu.Item>
						</Menu>
					</div>
					{isAuth ? (
						<Dropdown overlay={Account}>
							<Link to='/options'>
								<img
									className={styles.userAvatar}
									src={userAvatar}
									alt={login}
								/>
							</Link>
						</Dropdown>
					) : (
						<p className={styles.accountButton}>Не авторизован</p>
					)}
				</>
			)}
		</header>
	)
}
