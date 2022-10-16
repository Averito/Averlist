import { FC } from 'react'
import { ITooltipParams } from 'ag-grid-community'

import styles from './NameTooltip.module.scss'
import { Averlist } from '@averlistApi/types'

export const NameTooltip: FC<ITooltipParams<Averlist.Anime>> = props => {
	return <div className={styles.tooltip}>{props.value}</div>
}
