import { useEffect } from 'react'

import { useAppDispatch } from './useAppDispatch'
import { getMeInvitationsThunk } from '../store/reducers/userReducer/userThunks'

export const useInvitations = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		let interval = setInterval(() => {
			dispatch(getMeInvitationsThunk())
		}, 60000)
		return () => clearInterval(interval)
	}, [dispatch])
}
