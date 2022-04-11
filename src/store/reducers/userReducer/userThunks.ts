import { createAsyncThunk } from '@reduxjs/toolkit'
import { myApi } from 'api'

export const getAnimeListThunk = createAsyncThunk(
	'user/getAnimeList',
	myApi.anime.get
)
export const createAnimeThunk = createAsyncThunk(
	'user/createAnime',
	myApi.anime.create
)
export const removeAnimeThunk = createAsyncThunk(
	'user/removeAnimeThunk',
	myApi.anime.delete
)
export const editStatusAnimeThunk = createAsyncThunk(
	'user/editStatusAnimeThunk',
	myApi.anime.edit
)
export const getUserThunk = createAsyncThunk('user/getUser', myApi.auth.getUser)
export const editUserThunk = createAsyncThunk('user/editUser', myApi.user.edit)
export const setAvatarThunk = createAsyncThunk(
	'user/setAvatar',
	myApi.user.setAvatar
)
export const forgotPasswordThunk = createAsyncThunk(
	'user/forgotPasswordComplete',
	myApi.auth.forgotPassword
)
