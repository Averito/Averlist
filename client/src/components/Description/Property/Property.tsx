import { FC, PropsWithChildren, useMemo } from 'react'
import cs from 'classnames'

import styles from './Property.module.scss'
import { PropertyProps } from './Property.types'
import { COLS_BY_DEFAULT, ROWS_BY_DEFAULT } from './Property.config'

export const Property: FC<PropsWithChildren<PropertyProps>> = ({
	cols = COLS_BY_DEFAULT,
	rows = ROWS_BY_DEFAULT,
	gap,
	margin,
	className,
	children
}) => {
	const gridTemplateColumns = useMemo<string>(() => cols.join(' '), [cols])
	const gridTemplateRows = useMemo<string>(() => rows.join(' '), [rows])

	return (
		<div
			className={cs(styles.container, className)}
			style={{ margin, gridTemplateColumns, gridTemplateRows, gridGap: gap }}
		>
			{children}
		</div>
	)
}
