import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import { useAppSelector } from 'hooks/useAppSelector'

export const GlobalRouter: React.FC = () => {
	const isAuth = useAppSelector(state => state.landing.isAuth)

	return (
		<>
			<Routes>
				{!isAuth ? (
					<>
						<Route path='/' element={<Navigate to='/login' replace />} />
						<Route
							path='/anime-library'
							element={<Navigate to='/login' replace />}
						/>
						<Route
							path='/titles/:titleName'
							element={<Navigate to='/login' replace />}
						/>
					</>
				) : (
					<>
						<Route path='/login' element={<Navigate to='/' replace />} />
						<Route path='/registration' element={<Navigate to='/' replace />} />
						<Route
							path='/restore-password'
							element={<Navigate to='/' replace />}
						/>
					</>
				)}
			</Routes>
		</>
	)
}
