import { forwardRef, PropsWithChildren } from 'react'
import classNames from 'classnames'

import styles from './Flex.module.scss'
import { FlexProps } from './Flex.types'

export const Flex = forwardRef<HTMLDivElement, PropsWithChildren<FlexProps>>(
	(
		{
			className,
			justifyContent,
			flexDirection,
			backgroundColor,
			alignItems,
			padding,
			margin,
			onClick,
			width,
			flexWrap,
			gap,
			children
		},
		ref
	) => {
		const style = {
			justifyContent,
			alignItems,
			flexDirection,
			backgroundColor,
			margin,
			width,
			flexWrap,
			padding,
			gap
		}

		return (
			<div
				ref={ref}
				className={classNames(styles.flex, className)}
				onClick={onClick}
				style={style}
			>
				{children}
			</div>
		)
	}
)
