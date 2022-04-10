import React, { useEffect } from 'react'

import { Router } from 'components/Router'
import {
	authCheckThunk,
	getUpdatesThunk
} from 'store/reducers/landingReducer/landingThunks'
import { api } from 'api'
import { useAppSelector } from 'hooks/useAppSelector'
import {
	getAnimeListThunk,
	getUserThunk
} from 'store/reducers/userReducer/userThunks'
import { objectParamsByDefault } from 'api/anilibriaApi'
import { useAppDispatch } from 'hooks/useAppDispatch'

export const App: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isAuth, userId } = useAppSelector(state => state.landing)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			api.setUserToken(token)
			dispatch(authCheckThunk(token))
		}
		if (isAuth && userId) {
			dispatch(getUserThunk())
			dispatch(getAnimeListThunk(userId))
			dispatch(getUpdatesThunk(objectParamsByDefault))
		}
	}, [dispatch, isAuth, userId])

	return <Router />
}
