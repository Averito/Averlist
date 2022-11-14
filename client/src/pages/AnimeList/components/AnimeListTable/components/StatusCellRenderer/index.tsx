import { FC } from 'react'
import { ICellRendererParams } from 'ag-grid-community'

import styles from './StatusCellRenderer.module.scss'
import { Averlist } from '@averlistApi/types'

type StatusCellRendererProps = ICellRendererParams<Averlist.Anime, string> & {
	openEditStatusModal: () => unknown
}

export const StatusCellRenderer: FC<StatusCellRendererProps> = ({
	value,
	data,
	openEditStatusModal
}) => {
	if (!data) return <></>

	return (
		<div className={styles.status} onClick={openEditStatusModal}>
			{value}
		</div>
	)
}
