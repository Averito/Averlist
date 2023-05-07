import { MouseEventHandler } from 'react'

export interface SelectMenu<T = string> {
	id: number
	label: string
	value: T
}

export interface SelectProps {
	label?: string
	placeholder?: string
	currentOption: SelectMenu<any>
	options: SelectMenu<any>[]
	onChange: (item: SelectMenu<any>) => MouseEventHandler<HTMLParagraphElement>
	width?: string
	margin?: string
}
