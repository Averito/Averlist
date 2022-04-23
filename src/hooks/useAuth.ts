import { useEffect } from 'react'

import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { api } from 'api'
import {
	authCheckThunk,
	getUpdatesThunk
} from 'store/reducers/landingReducer/landingThunks'
import {
	getAnimeListThunk,
	getUserThunk
} from 'store/reducers/userReducer/userThunks'
import { objectParamsByDefault } from 'api/anilibriaApi'
import { getAllUsersThunk } from 'store/reducers/usersReducer/usersThunks'

export const useAuth = () => {
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
			dispatch(getAllUsersThunk())
		}
	}, [dispatch, isAuth, userId])
}
