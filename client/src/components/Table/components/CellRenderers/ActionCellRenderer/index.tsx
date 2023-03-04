import { ICellRendererParams } from 'ag-grid-community'
import { FC, MouseEventHandler } from 'react'

import styles from './ActionCellRenderer.module.scss'
import { Averlist } from '@averlistApi/types'

type ActionCellRendererProps = ICellRendererParams<Averlist.Anime> & {
	removeAnime: (animeId: string, animeName: string) => unknown
}

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
