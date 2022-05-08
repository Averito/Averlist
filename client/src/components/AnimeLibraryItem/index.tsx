import React, { FC, MouseEventHandler } from 'react'
import { Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import styles from './styles.module.scss'
import { ANILIBRIA_URI } from 'variebles'
import { encodeAnimeName } from 'helpers/encodeAnimeName'
import { AddToList } from 'components/AddToList'
import { Title } from 'api/anilibriaApi/types'

interface AnimeLibraryItemProps {
	title: Title
}

export const AnimeLibraryItem: FC<AnimeLibraryItemProps> = ({ title }) => {
	const navigate = useNavigate()

	const animeName = encodeAnimeName(title.names.ru)
	const to = `/anime-library/${animeName}`

	const onClickCard: MouseEventHandler<HTMLDivElement> = event => {
		navigate(to)
	}

	const maxDescriptionLenght = 200

	return (
		<div
			className={styles.animeLibraryItemWrapper}
			style={{
				background: `url("${`${ANILIBRIA_URI}${title.posters.original.url}`}") 0 0/ 100% 100%`
			}}
		>
			<div className={styles.animeLibraryItemContainer}>
				<div className={styles.animeLibraryItem} onClick={onClickCard}>
					<Typography.Title className={styles.animeLibraryItemTitle} level={4}>
						<Link to={to}>{title.names.ru}</Link>
					</Typography.Title>
					<div className={styles.animeLibraryItemDescription}>
						<Typography.Paragraph
							className='whiteColor'
							style={{ lineHeight: '15px' }}
						>
							{title?.description?.slice(0, maxDescriptionLenght)}
							{title?.description?.length > 300 ? '...' : ''}
						</Typography.Paragraph>
					</div>
				</div>
				<AddToList animeName={title.names.ru} />
			</div>
		</div>
	)
}
