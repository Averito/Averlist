import { FC, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Select, SelectMenu } from '@components/Select'
import { Averlist } from '@averlistApi/types'
import { successToast } from '@helpers/toasts'
import AnimeStatus = Averlist.AnimeStatus

const Modal = dynamic(() => import('@components/Modal/Modal'), { ssr: false })

interface EditStatusModalProps {
	editStatusModalOpened: boolean
	closeEditStatusModal: () => unknown
	changeStatus: (animeId: string, status: Averlist.AnimeStatus) => unknown
	currentAnime: Averlist.Anime
}

export const EditStatusModal: FC<EditStatusModalProps> = ({
	editStatusModalOpened,
	closeEditStatusModal,
	changeStatus,
	currentAnime
}) => {
	const selectOptions: SelectMenu<Averlist.AnimeStatus>[] = [
		{
			id: 0,
			label: 'Просмотрено',
			value: AnimeStatus.VIEWED
		},
		{
			id: 1,
			label: 'Смотрю',
			value: AnimeStatus.LOOK
		},
		{
			id: 2,
			label: 'Запланировано',
			value: AnimeStatus.PLANNED
		},
		{
			id: 3,
			label: 'Пересматриваю',
			value: AnimeStatus.RECONSIDERING
		},
		{
			id: 4,
			label: 'Выходит',
			value: AnimeStatus.COMING_OUT
		},
		{
			id: 5,
			label: 'Заброшено',
			value: AnimeStatus.ABANDONED
		}
	]

	const [currentOption, setCurrentOption] = useState(selectOptions[0])

	useEffect(() => {
		const selectOption = selectOptions.find(
			option => option.value === currentAnime.status
		)
		if (!selectOption) return

		setCurrentOption(selectOption)
	}, [currentAnime])

	const onChangeSelectedOption = (option: SelectMenu<Averlist.AnimeStatus>) => {
		return () => setCurrentOption(option)
	}

	const onSaveAnime = () => {
		changeStatus(currentAnime.id, currentOption.value)
		closeEditStatusModal()
		successToast(
			`Статус аниме "${currentAnime.name}" успешно изменён на "${currentOption.value}"`
		)
	}

	return (
		<Modal
			opened={editStatusModalOpened}
			title='Редактирование статуса'
			onCancel={closeEditStatusModal}
			okText='Сохранить'
			onOk={onSaveAnime}
			closeOutside
		>
			<Select
				width='200px'
				options={selectOptions}
				currentOption={currentOption}
				onChange={onChangeSelectedOption}
			/>
		</Modal>
	)
}
