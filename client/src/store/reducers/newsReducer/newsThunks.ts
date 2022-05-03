import { createAsyncThunk } from '@reduxjs/toolkit'

import { myApi } from 'api'

export const getNewsThunk = createAsyncThunk('news/getAll', myApi.news.getAll)
export const createNewsThunk = createAsyncThunk(
	'news/create',
	myApi.news.create
)
export const editNewsThunk = createAsyncThunk('news/edit', myApi.news.edit)
export const deleteNewsThunk = createAsyncThunk(
	'news/delete',
	myApi.news.delete
)
