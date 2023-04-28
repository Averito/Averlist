import { FC, MouseEventHandler } from 'react'

import styles from './ActionCellRenderer.module.scss'
import { ActionCellRendererProps } from './ActionCellRenderer.types'

export const ActionCellRenderer: FC<ActionCellRendererProps> = ({
	removeAnime,
	data
}) => {
	const onClickRemoveAnime: MouseEventHandler<HTMLDivElement> = () => {
		if (!data) return
		removeAnime(data.id, data.name)
	}

	return (
		<div className={styles.remove} onClick={onClickRemoveAnime}>
			Удалить
		</div>
	)
}
