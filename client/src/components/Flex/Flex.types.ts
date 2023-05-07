import { Property } from 'csstype'
import { MouseEventHandler } from 'react'

type JustifyContent = Property.JustifyContent
type AlignItems = Property.AlignItems
type FlexDirection = Property.FlexDirection
type BackgroundColor = Property.BackgroundColor
type Margin = Property.Margin
type Padding = Property.Padding
type Width = Property.Width
type FlexWrap = Property.FlexWrap
type Gap = Property.Gap

export interface FlexProps {
	justifyContent?: JustifyContent
	alignItems?: AlignItems
	flexDirection?: FlexDirection
	backgroundColor?: BackgroundColor
	margin?: Margin
	padding?: Padding
	className?: string
	width?: Width
	flexWrap?: FlexWrap
	gap?: Gap
	onClick?: MouseEventHandler<HTMLDivElement>
}
