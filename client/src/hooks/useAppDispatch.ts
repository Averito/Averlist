import { useDispatch } from 'react-redux'

import { RootDispatch } from '@store/index'

export const useAppDispatch: () => RootDispatch = useDispatch
