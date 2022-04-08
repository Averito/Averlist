import { ChangeEvent, FC, useState } from 'react'
import { AutoComplete, Button, Typography } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

import styles from './styles.module.scss'
import { errorMessage, successMessage } from 'helpers/messages'
import {
	createAnimeThunk,
	removeAnimeThunk
} from 'store/reducers/userReducer/userThunks'
import { Sorting } from './components/Sorting'
import { ChangesOnAnilibria } from './components/ChangesFromAnilibria'
import { useWindowSize } from 'hooks/useWindowSize'
import { Loader } from '../Loader'
import { useAppSelector } from 'hooks/useAppSelector'
import { setAutoCompleteOption } from 'store/reducers/landingReducer'
import { sortOptionsForAutocomplete } from 'helpers/sortOptionsForAutoComplete'
import { Anime } from 'api/myApi/anime/types'
import { useInputValue } from 'hooks/useInputValue'
import { AnilibriaLoader } from '../Loader/loaderTypes/AnilibriaLoader'
import { useAppDispatch } from 'hooks/useAppDispatch'

export const AnimeList: FC = () => {
	const { width } = useWindowSize()

	const { value: name, setValue: setName } = useInputValue('')
	const [selectedAnime, setSelectedAnime] = useState<string[]>([])

	const dispatch = useAppDispatch()
	const { loading: loaded } = useAppSelector(state => state.user)
	const userId = useAppSelector(state => state.landing.userId)
	const animeList = useAppSelector(state => state.user.animeList)
	const titleList = useAppSelector(state => state.landing.titleList)
	const titleListLoading = useAppSelector(
		state => state.landing.titleListLoading
	)
	const autoCompleteOptions = useAppSelector(
		state => state.landing.autoCompleteOptions
	)

	const prevent = (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
	}
	const onChangeName = (name: string) => {
		setName(name)
	}
	const onSearchName = (value: string) => {
		dispatch(
			setAutoCompleteOption(
				sortOptionsForAutocomplete(titleList, animeList, value)
			)
		)
	}
	const onClickCreateAnime: any = async (event: any, animeName = name) => {
		if (!(event.key === 'Enter' || event.key === undefined)) return
		const newAnime: Anime = { name: animeName, status: 0 }

		if (animeName.replaceAll(' ', '').length === 0) {
			return errorMessage('Поле названия пустое')
		}
		if (animeList.some(anime => anime.name === animeName)) {
			return errorMessage('Такое аниме уже записано')
		}

		dispatch(createAnimeThunk({ anime: newAnime, userId }))

		dispatch(
			setAutoCompleteOption(
				sortOptionsForAutocomplete(titleList, animeList, name)
			)
		)
		setName('')
		successMessage('Аниме успешно записано')
	}
	const onSelectName = (name: string) => {
		setName(name)
		onClickCreateAnime(name, name)
	}
	const onClickRemoveSelected = async () => {
		await selectedAnime.forEach(selectAnime => {
			dispatch(removeAnimeThunk(selectAnime))
		})
		setSelectedAnime([])
	}

	return (
		<div className={styles.animePageStyled}>
			<h2>Создание Аниме</h2>
			<form action='#' method='POST' onSubmit={prevent}>
				<AutoComplete
					style={{ width: '100%', marginBottom: '10px' }}
					placeholder='Название аниме'
					options={autoCompleteOptions}
					onChange={onChangeName}
					onSearch={onSearchName}
					onSelect={onSelectName}
					value={name}
				/>
				<Button
					type='primary'
					icon={<CheckOutlined />}
					onClick={onClickCreateAnime}
					onKeyPress={onClickCreateAnime}
				>
					Сохранить
				</Button>
			</form>
			<Typography.Title level={2}>
				Всего аниме: {animeList.length}
			</Typography.Title>
			<div style={{ alignSelf: 'start' }}>
				<Button type='primary' danger onClick={onClickRemoveSelected}>
					Удалить выбранные
				</Button>
				{titleListLoading && width <= 1200 && <AnilibriaLoader />}
			</div>
			<div className={styles.animeBlock}>
				{loaded ? <Loader /> : <Sorting setSelectedAnime={setSelectedAnime} />}
				{width > 1200 && <ChangesOnAnilibria />}
			</div>
		</div>
	)
}
