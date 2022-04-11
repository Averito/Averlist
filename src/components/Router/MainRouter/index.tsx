import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { routes } from '../routes'

export const MainRouter: React.FC = () => {
	return (
		<>
			<Routes>
				{routes
					.filter(
						route =>
							route.type === 'another' ||
							route.type === 'children' ||
							route.type === 'options'
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
