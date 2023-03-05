import { FC, memo, MouseEventHandler, PropsWithChildren } from 'react'
import classnames from 'classnames'
import { Property } from 'csstype'

import styles from './Button.module.scss'

import Width = Property.Width

interface ButtonProps {
	onClick?: MouseEventHandler<HTMLButtonElement>
	className?: string
	width?: Width
	disabled?: boolean
}

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
