import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { routes } from '../routes'

export const DefaultRouter: React.FC = () => {
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
			</Routes>
		</>
	)
}
