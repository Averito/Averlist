import { FC, PropsWithChildren } from 'react'
import cs from 'classnames'

import styles from './Key.module.scss'
import { KeyProps } from './Key.types'

export const Key: FC<PropsWithChildren<KeyProps>> = ({
	className,
	children
}) => {
	return <div className={cs(styles.key, className)}>{children}</div>
}
