import { FC, useState } from 'react'

import Modal from '@components/Modal'
import { Autocomplete, AutocompleteMenu } from '@components/Autocomplete'
import { useGetSearchTitles } from '@hooks/useGetSearchTitles'
import { Title } from '@anilibriaApi/types'
import { anilibria } from '@anilibriaApi/anilibria'
import { errorToast, successToast } from '@helpers/toasts'
import { Averlist } from '@averlistApi/types'
import { Select, SelectMenu } from '@components/Select'
import { statusFilterOptions } from '@pages/AnimeList/statusFilterOptions'
import { isAnimeDuplicate } from '@helpers/isAnimeDuplicate'
import { averlist } from '@averlistApi/averlist'
import animeListStore from '@stores/animeList.store'

interface AnimeListCreateAnimeModalProps {
	opened: boolean
	onClose: () => unknown
}

const ANILIBRIA_URI = process.env.NEXT_PUBLIC_ANILIBRIA_URI

const AnimeListCreateAnimeModal: FC<AnimeListCreateAnimeModalProps> = ({
	opened,
	onClose
}) => {
	const [animeName, setAnimeName] = useState<string>('')

	const queryObject = {
		filter: ['names', 'id'],
		search: animeName,
		limit: 15
	}
	const { data, refetch } = useGetSearchTitles(queryObject)

	const onChangeAnimeName = async (value: string) => {
		setAnimeName(value)
		await refetch()
	}

	const [selectedTitle, setSelectedTitle] = useState<Title | null>(null)
	const onSelectAnimeName = async (animeName: AutocompleteMenu) => {
		const title = await anilibria.getTitle({
			id: animeName.id
		})
		setSelectedTitle(title)
	}

	const autocompleteMenus: AutocompleteMenu[] = data
		? data
				.map(title => ({ id: title.id, name: title.names.ru }))
				.filter(title => title.name.includes(animeName))
		: []

	const selectOptions = statusFilterOptions.slice(
		1,
		statusFilterOptions.length
	) as SelectMenu<Averlist.AnimeStatus>[]
	const [currentStatus, setCurrentStatus] = useState<
		SelectMenu<Averlist.AnimeStatus>
	>(selectOptions[0])

	const onChangeCurrentStatus = (
		newCurrentStatus: SelectMenu<Averlist.AnimeStatus>
	) => {
		return () => {
			setCurrentStatus(newCurrentStatus)
		}
	}

	const resetValues = () => {
		setAnimeName('')
		setCurrentStatus(selectOptions[0])
	}

	const onOk = async () => {
		if (!animeName) return errorToast('Поле имени пустое')

		let newAnime: Averlist.NewAnime = {
			name: animeName,
			status: currentStatus.value
		}

		let titleIncludesAnimeName: Title | null = null
		const autocompleteMenuIncludesAnimeName = autocompleteMenus.find(
			title => title.name === animeName
		)
		if (autocompleteMenuIncludesAnimeName && !selectedTitle) {
			titleIncludesAnimeName = await anilibria.getTitle({
				id: autocompleteMenuIncludesAnimeName.id
			})
		}

		const title = selectedTitle || titleIncludesAnimeName

		if (title) {
			newAnime = {
				anilibriaId: title.id,
				anilibriaCode: title.code,
				name: title.names.ru,
				poster: `${ANILIBRIA_URI}${title.posters.original.url}`,
				status: currentStatus.value
			}
			setSelectedTitle(null)
		}

		const animeDuplicate = isAnimeDuplicate(newAnime)
		if (animeDuplicate) return errorToast('Такое аниме уже добавлено')

		const anime = await averlist.anime.create(newAnime)
		animeListStore.addToAnimeList(anime)
		successToast(`Аниме "${anime.name}" успешно добавлено`)
		onClose()
		return resetValues()
	}

	return (
		<Modal
			title='Добавление аниме'
			opened={opened}
			width='max(600px, 320px)'
			closeOutside
			okText='Добавить'
			onCancel={onClose}
			onOk={onOk}
		>
			<Autocomplete
				value={animeName}
				onChange={onChangeAnimeName}
				onSelect={onSelectAnimeName}
				placeholder='Введите название'
				name='animeName'
				width='100%'
				menuList={autocompleteMenus}
				margin='0 0 15px 0'
			/>
			<Select
				currentOption={currentStatus}
				options={selectOptions}
				onChange={onChangeCurrentStatus}
				width='100%'
			/>
		</Modal>
	)
}

export default AnimeListCreateAnimeModal
