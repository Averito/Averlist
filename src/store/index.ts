import { applyMiddleware, combineReducers, createStore } from 'redux'
import reduxThunk from 'redux-thunk'

import { userReducer } from './reducers/userReducer'
import { landingReducer } from './reducers/landingReducer'

const reducers = combineReducers({
	user: userReducer,
	landing: landingReducer
})

export const store = createStore(reducers, applyMiddleware(reduxThunk))

export type RootState = ReturnType<typeof reducers>
