import { FC } from 'react'

import styles from './StatusCellRenderer.module.scss'
import { StatusCellRendererProps } from './StatusCellRenderer.types'

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
