import { createAsyncThunk } from '@reduxjs/toolkit'
import { myApi, anilibriaApi } from 'api'

export const registrationThunk = createAsyncThunk(
	'landing/registration',
	myApi.auth.registration
)
export const loginThunk = createAsyncThunk('user/login', myApi.auth.login)
export const authCheckThunk = createAsyncThunk(
	'landing/authCheck',
	myApi.auth.authCheck
)
export const forgotPasswordThunk = createAsyncThunk(
	'landing/forgotPasswordComplete',
	myApi.auth.forgotPassword
)
export const getUpdatesThunk = createAsyncThunk(
	'landing/getUpdates',
	anilibriaApi.getUpdates
)
