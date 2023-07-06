import { FC, PropsWithChildren } from 'react'
import cs from 'classnames'

import styles from './Value.module.scss'
import { ValueProps } from '@components/Description/Value/Value.types'

export const Value: FC<PropsWithChildren<ValueProps>> = ({
	className,
	children
}) => {
	return <div className={cs(styles.value, className)}>{children}</div>
}
