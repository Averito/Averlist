import React, { FC } from 'react'
import { Descriptions, Tag } from 'antd'
import moment from 'moment'

import { selectStatus, selectStatusColor } from 'helpers/selectStatus'
import { Title } from 'api/anilibriaApi/types'
import { Status } from 'api/myApi/anime/types'
import { SelectStatusIcon } from 'components/SelectStatusIcon'

interface DescriptionProps {
	titleMain: Title
	status: Status | -1
}

export const Description: FC<DescriptionProps> = ({ titleMain, status }) => {
	return (
		<Descriptions column={1} bordered>
			<Descriptions.Item label='Название'>
				{titleMain?.names?.ru}
			</Descriptions.Item>
			<Descriptions.Item label='Англ. Название'>
				{titleMain?.names?.en}
			</Descriptions.Item>
			<Descriptions.Item label='Анонс'>
				{titleMain?.announce || 'Нет'}
			</Descriptions.Item>
			<Descriptions.Item label='Тип'>
				{titleMain?.type?.full_string || 'Неизвестно'}
			</Descriptions.Item>
			<Descriptions.Item label='Сезон'>
				{(titleMain?.season?.string?.charAt(0)?.toUpperCase() +
					titleMain?.season?.string?.slice(1) || 'Неизвестно') +
					' ' +
					titleMain?.season?.year || 666}
			</Descriptions.Item>
			<Descriptions.Item label='Статус в листе'>
				{status !== -1 ? (
					<Tag
						color={selectStatusColor(status)}
						icon={<SelectStatusIcon status={status} />}
					>
						{selectStatus(status)}
					</Tag>
				) : (
					'Данного аниме в списке нет'
				)}
			</Descriptions.Item>
			<Descriptions.Item label='Статус'>
				{titleMain?.status?.string || 'Неизвестно'}
			</Descriptions.Item>
			<Descriptions.Item label='Жанры'>
				{titleMain?.genres.join(', ') || 'Неизвестно'}
			</Descriptions.Item>
			<Descriptions.Item label='Последнее изменение'>
				{moment(titleMain?.last_changes).format('DD/MM/yyyy | HH:mm') ||
					'Неизвестно'}
			</Descriptions.Item>
			<Descriptions.Item label='Заблокировано'>
				{titleMain?.blocked?.blocked ? 'Да' : 'Нет'}
			</Descriptions.Item>
			<Descriptions.Item label='Тайминги'>
				{titleMain?.team?.timing.join(', ') || 'Нет'}
			</Descriptions.Item>
			<Descriptions.Item label='Озвучивали'>
				{titleMain?.team?.voice.join(', ') || 'Нет'}
			</Descriptions.Item>
			<Descriptions.Item label='Переводчики'>
				{titleMain?.team?.translator.join(', ') || 'Нет'}
			</Descriptions.Item>
			<Descriptions.Item label='Редактирование'>
				{titleMain?.team?.editing.join(', ') || 'Нет'}
			</Descriptions.Item>
			<Descriptions.Item label='Декор'>
				{titleMain?.team?.decor.join(', ') || 'Нет'}
			</Descriptions.Item>
		</Descriptions>
	)
}
