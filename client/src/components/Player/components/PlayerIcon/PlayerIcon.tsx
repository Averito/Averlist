import { FC } from 'react'
import cs from 'classnames'

import styles from './PlayerIcon.module.scss'
import { PlayerIconProps } from './PlayerIcon.types'

export const PlayerIcon: FC<PlayerIconProps> = ({
	icon,
	size = 23,
	cursor = 'pointer',
	className,
	...props
}) => {
	const Icon = icon

	return (
		<Icon
			{...props}
			className={cs(styles.icon, className)}
			size={size}
			cursor={cursor}
		/>
	)
}
