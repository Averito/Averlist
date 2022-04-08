import { FC } from 'react'
import { Dropdown, Menu, Typography } from 'antd'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'
import { Hamburger } from './components/Hamburger'
import { routes } from 'components/Router/routes'
import { useWindowSize } from 'hooks/useWindowSize'
import { useAppSelector } from 'hooks/useAppSelector'
import { logout, setRandomTitle } from 'store/reducers/landingReducer'
import { encodeAnimeName } from 'helpers/encodeAnimeName'
import { useAppDispatch } from 'hooks/useAppDispatch'

export const Header: FC = () => {
	const { width } = useWindowSize()
	const isMobile = width <= 768

	const dispatch = useAppDispatch()
	const login = useAppSelector(state => state.user.login)
	const { randomTitle, isAuth } = useAppSelector(state => state.landing)

	const onClickLogout = () => {
		dispatch(logout())
	}

	const onClickRandomAnime = () => {
		dispatch(setRandomTitle())
	}

	const Account = (
		<Menu>
			<Menu.Item key='logout' onClick={onClickLogout}>
				Выйти
			</Menu.Item>
		</Menu>
	)

	const randomAnimeName = encodeAnimeName(randomTitle?.names?.ru)

	return (
		<header className={styles.header}>
			<div className={styles.headerItem1}>
				<Typography.Title level={4} style={{ color: 'white', margin: 0 }}>
					AnimeList
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
							<p className={styles.accountButton}>{login}</p>
						</Dropdown>
					) : (
						<p className={styles.accountButton}>'Не авторизован</p>
					)}
				</>
			)}
		</header>
	)
}
