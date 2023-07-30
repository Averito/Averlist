import { Property } from 'csstype'
export interface ContainerProps {
	cols?: string[]
	margin?: Property.Margin
	gap?: Property.GridGap
	width?: Property.Width
	className?: string
}
