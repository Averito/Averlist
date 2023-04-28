import { FC, memo, PropsWithChildren } from 'react'
import classnames from 'classnames'

import styles from './Button.module.scss'
import { ButtonProps } from '@components/Button/Button.types'

export const Button: FC<PropsWithChildren<ButtonProps>> = memo(
	({ children, onClick, className, disabled, width = '100%' }) => {
		const buttonStyle = { width }

		return (
			<button
				style={buttonStyle}
				className={classnames(styles.button, className)}
				onClick={onClick}
				disabled={disabled}
			>
				{children}
			</button>
		)
	}
)
