import { FC, useState } from 'react'
import { SizeType } from 'antd/es/config-provider/SizeContext'

import { Button, Modal, Select } from 'antd'
import { selectStatus } from 'helpers/selectStatus'
import { useWindowSize } from 'hooks/useWindowSize'
import { errorMessage, successMessage } from 'helpers/messages'
import { createAnimeThunk } from 'store/reducers/userReducer/userThunks'
import { useAppSelector } from 'hooks/useAppSelector'
import { Anime, Status } from 'api/myApi/anime/types'
import { useAppDispatch } from 'hooks/useAppDispatch'

interface AddToListProps {
	animeName: string
}

export const AddToList: FC<AddToListProps> = ({ animeName }) => {
	const { isMobile } = useWindowSize()

	const [status, setStatus] = useState<Status>(0)
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	const dispatch = useAppDispatch()
	const userId = useAppSelector(state => state.landing.userId)
	const animeList = useAppSelector(state => state.user.animeList)

	const onChangeStatus = (value: string) => {
		const nextStatus: Status = +value as Status
		setStatus(nextStatus)
	}
	const showModal = () => {
		setIsModalVisible(true)
	}
	const handleOk = async () => {
		const name = animeName
		const newAnime: Anime = {
			name: name,
			status
		}

		const animeRepeatGuard = animeList.some(animeL => animeL.name === name)
		if (animeRepeatGuard)
			return errorMessage('Такое аниме уже было записано ранее')

		dispatch(createAnimeThunk({ anime: newAnime, userId }))

		successMessage('Успешно записано!')
		setIsModalVisible(false)
	}
	const handleCancel = () => {
		setIsModalVisible(false)
	}

	return (
		<>
			<Button
				size={isMobile ? ('small' as SizeType) : ('default' as SizeType)}
				type='primary'
				onClick={showModal}
			>
				Добавить в список
			</Button>
			<Modal
				title='Выбор статуса'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				width={280}
			>
				<Select
					defaultValue='0'
					style={{ width: '100%' }}
					onChange={onChangeStatus}
				>
					<Select.Option value='0'>{selectStatus(0)}</Select.Option>
					<Select.Option value='1'>{selectStatus(1)}</Select.Option>
					<Select.Option value='2'>{selectStatus(2)}</Select.Option>
					<Select.Option value='3'>{selectStatus(3)}</Select.Option>
					<Select.Option value='4'>{selectStatus(4)}</Select.Option>
				</Select>
			</Modal>
		</>
	)
}
