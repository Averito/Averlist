import { bindActionCreators } from 'redux'

import { useAppDispatch } from '@hooks/useAppDispatch'
import { allActions } from '@store/index'

export const useActions = () => {
	const dispatch = useAppDispatch()

	return bindActionCreators(allActions, dispatch)
}
