import React, { FC } from 'react'
import { Grid, Table as TableAntd, Tag } from 'antd'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'
import { Anime, Status } from 'api/myApi/anime/types'
import { User } from 'api/myApi/auth/types'
import { encodeAnimeName } from 'helpers/encodeAnimeName'
import { useAppSelector } from 'hooks/useAppSelector'
import { selectStatus, selectStatusColor } from 'helpers/selectStatus'
import { SelectStatusIcon } from 'components/SelectStatusIcon'

const { useBreakpoint } = Grid

interface TableProps {
	user: User
}

export const Table: FC<TableProps> = ({ user }) => {
	const { md } = useBreakpoint()

	const titleList = useAppSelector(state => state.landing.titleList)

	const columns: any = [
		{
			title: 'Название',
			dataIndex: 'name',
			key: 'name',
			width: md ? 350 : 100,
			fixed: 'left',
			sorter(a: Anime, b: Anime): number {
				if (a.name > b.name) {
					return 1
				}
				return -1
			},
			render: (name: string) => {
				const animeName = encodeAnimeName(name)
				return (
					<>
						{titleList.some(title => title.names.ru === name) ? (
							<Link to={`/anime-library/${animeName}`}>{name}</Link>
						) : (
							<span className={styles.nameCol}>{name}</span>
						)}
					</>
				)
			}
		},
		{
			title: 'Статус',
			dataIndex: 'status',
			key: 'status',
			width: 200,
			sorter: (a: Anime, b: Anime) => a.status - b.status,
			render: (status: Status) => (
				<Tag
					color={selectStatusColor(status)}
					icon={<SelectStatusIcon status={status} />}
				>
					{selectStatus(status)}
				</Tag>
			)
		}
	]

	const dataSource = user?.animeList?.map(animeL => ({
		...animeL,
		key: animeL._id
	}))

	return (
		<TableAntd
			size='small'
			dataSource={dataSource}
			columns={columns}
			pagination={{ pageSize: 30, position: ['topCenter'], size: 'default' }}
		/>
	)
}
