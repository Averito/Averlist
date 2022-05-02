import { createAsyncThunk } from '@reduxjs/toolkit'

import { myApi } from 'api'

export const getAllUsersThunk = createAsyncThunk(
	'users/getAllusers',
	myApi.user.getAll
)
