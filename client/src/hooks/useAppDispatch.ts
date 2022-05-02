import { useDispatch } from 'react-redux'

import { RootDispatch } from 'store'

export const useAppDispatch = () => useDispatch<RootDispatch>()
