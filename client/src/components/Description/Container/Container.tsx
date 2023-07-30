import { FC, PropsWithChildren, useMemo } from 'react'
import cs from 'classnames'

import styles from './Container.module.scss'
import { ContainerProps } from './Container.types'
import { COLS_BY_DEFAULT } from './Container.config'

export const Container: FC<PropsWithChildren<ContainerProps>> = ({
	children,
	cols = COLS_BY_DEFAULT,
	gap = '4.5px',
	margin = '0',
	width = '440px',
	className
}) => {
	const gridTemplateColumns = useMemo<string>(() => cols.join(' '), [cols])

	return (
		<div
			className={cs(styles.container, className)}
			style={{ margin, width, gridTemplateColumns, gridGap: gap }}
		>
			{children}
		</div>
	)
}
