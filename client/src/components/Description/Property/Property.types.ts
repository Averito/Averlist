import { Property } from 'csstype'
export interface PropertyProps {
	cols?: string[]
	rows?: string[]
	margin?: Property.Margin
	gap?: Property.GridGap
	className?: string
}
