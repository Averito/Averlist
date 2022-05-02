import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import { routes } from './routes'
import { MainLayout } from '../../layouts/MainLayout'
import { MainRouter } from './MainRouter'
import { useAppSelector } from '../../hooks/useAppSelector'

export const Router: React.FC = () => {
	const isAuth = useAppSelector(state => state.landing.isAuth)

	return (
		<>
			<Routes>
				{routes
					.filter(
						route =>
							route.type === 'registration' ||
							route.type === 'login' ||
							route.type === 'rememberPassword'
					)
					.map(route => {
						const { component: Component } = route
						return (
							<Route
								key={route.key}
								path={route.route}
								element={<Component />}
							/>
						)
					})}
				<Route
					path='*'
					element={
						isAuth ? (
							<MainLayout children={<MainRouter />} />
						) : (
							<Navigate to='/login' />
						)
					}
				/>
			</Routes>
		</>
	)
}
