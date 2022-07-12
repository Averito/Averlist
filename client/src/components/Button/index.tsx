import { FC, MouseEventHandler, ReactChildren, ReactNode } from 'react'
import classnames from 'classnames'

import styles from './Button.module.scss'

interface ButtonProps {
	onClick?: MouseEventHandler<HTMLButtonElement>
	download?: boolean
	link?: boolean
	href?: string
	className?: string
	children: ReactNode
}

export const Button: FC<ButtonProps> = ({
	children,
	onClick,
	download,
	className,
	href,
	link
}) => {
	const buttonType = download ? styles.downloadButton : styles.notDownloadButton

	return (
		<>
			{link ? (
				<a
					className={classnames(styles.button, buttonType, className)}
					href={href}
					download={href}
					target='_blank'
					rel='noreferrer'
				>
					{children}
				</a>
			) : (
				<button
					className={classnames(styles.button, buttonType, className)}
					onClick={onClick}
				>
					{children}
				</button>
			)}
		</>
	)
}
