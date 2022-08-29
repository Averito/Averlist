import { FC, memo, MouseEventHandler, PropsWithChildren } from 'react'
import classnames from 'classnames'

import styles from './Button.module.scss'

interface ButtonProps {
	onClick?: MouseEventHandler<HTMLButtonElement>
	className?: string
}

export const Button: FC<PropsWithChildren<ButtonProps>> = memo(
	({ children, onClick, className }) => {
		return (
			<button
				className={classnames(styles.button, className)}
				onClick={onClick}
			>
				{children}
			</button>
		)
	}
)
