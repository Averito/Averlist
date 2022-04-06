import React, { FC } from 'react'
import { Skeleton, Tag } from 'antd'
import moment from 'moment'

import styles from './styles.module.scss'
import { selectStatus, selectStatusColor } from 'helpers/selectStatus'
import { useWindowSize } from 'hooks/useWindowSize'
import { Title } from 'api/anilibriaApi/types'
import { Status } from 'api/myApi/anime/types'
import { SelectStatusIcon } from 'components/SelectStatusIcon'

interface DescriptionMobileProps {
	titleMain: Title
	status: Status | -1
}

export const DescriptionMobile: FC<DescriptionMobileProps> = ({
	titleMain,
	status
}) => {
	const { width } = useWindowSize()
	const isMobile = width <= 768

	return (
		<div className={styles.descriptionMobileWrapper}>
			{!isMobile && (
				<>
					<p>
						<span>Название: </span>
						{titleMain?.names?.ru}
					</p>
					<p>
						<span>Англ. Название: </span>
						{titleMain?.names?.en}
					</p>
				</>
			)}
			<p>
				<span>Анонс: </span>
				{titleMain?.announce || 'Нет'}
			</p>
			<p>
				<span>Тип: </span>
				{titleMain?.type?.full_string || 'Неизвестно'}
			</p>
			<p>
				<span>Сезон: </span>
				{(titleMain?.season?.string?.charAt(0)?.toUpperCase() +
					titleMain?.season?.string?.slice(1) || 'Неизвестно') +
					' ' +
					titleMain?.season?.year || 666}
			</p>
			<p>
				<span>Cтатус в листе: </span>
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
			</p>
			<p>
				<span>Статус: </span>
				{titleMain?.status?.string || 'Неизвестно'}
			</p>
			<p>
				<span>Жанры: </span>
				{titleMain?.genres.join(', ') || 'Неизвестно'}
			</p>
			<p>
				<span>Последнее изменение: </span>
				{moment(titleMain?.last_changes).format('DD/MM/yyyy | HH:mm') || (
					<Skeleton active />
				)}
			</p>
			<p>
				<span>Заблокировано: </span>
				{titleMain?.blocked?.blocked ? 'Да' : 'Нет'}
			</p>
			<p>
				<span>Команда: </span>
				{titleMain?.team?.timing.join(', ') || 'Нет'}
			</p>
			<p>
				<span>Озвучивали: </span>
				{titleMain?.team?.voice.join(', ') || 'Нет'}
			</p>
			<p>
				<span>Переводили: </span>
				{titleMain?.team?.translator.join(', ') || 'Нет'}
			</p>
			<p>
				<span>Редактирование:</span>
				{titleMain?.team?.editing.join(', ') || 'Нет'}
			</p>
			<p>
				<span>Декор: </span>
				{titleMain?.team?.decor.join(', ') || 'Нет'}
			</p>
		</div>
	)
}
