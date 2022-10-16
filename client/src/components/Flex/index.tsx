import { forwardRef, MouseEventHandler, PropsWithChildren } from 'react'
import classNames from 'classnames'
import { Property } from 'csstype'

import styles from './Flex.module.scss'
import Gap = Property.Gap

type JustifyContent = Property.JustifyContent
type AlignItems = Property.AlignItems
type FlexDirection = Property.FlexDirection
type BackgroundColor = Property.BackgroundColor
type Margin = Property.Margin
type Padding = Property.Padding
type Width = Property.Width
type FlexWrap = Property.FlexWrap

interface FlexProps {
	justifyContent?: JustifyContent
	alignItems?: AlignItems
	flexDirection?: FlexDirection
	backgroundColor?: BackgroundColor
	margin?: Margin
	padding?: Padding
	customClassName?: string
	width?: Width
	flexWrap?: FlexWrap
	gap?: Gap
	onClick?: MouseEventHandler<HTMLDivElement>
}

export const Flex = forwardRef<HTMLDivElement, PropsWithChildren<FlexProps>>(
	(
		{
			customClassName,
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
				className={classNames(styles.flex, customClassName)}
				onClick={onClick}
				style={style}
			>
				{children}
			</div>
		)
	}
)
