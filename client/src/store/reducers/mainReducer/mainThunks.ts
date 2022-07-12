import { createAsyncThunk } from '@reduxjs/toolkit'
import { anilibria } from '@anilibriaApi/anilibria'
import { Title } from '@anilibriaApi/types'

export const getTitleListThunk = createAsyncThunk(
	'main/getTitleList',
	anilibria.getChanges
)
