import { FC } from 'react'
import { ICellRendererParams } from 'ag-grid-community'

import styles from './NameCellRenderer.module.scss'
import { Averlist } from '@averlistApi/types'

export const NameCellRenderer: FC<
	ICellRendererParams<Averlist.Anime, string>
> = ({ value }) => {
	return <p className={styles.text}>{value}</p>
}
