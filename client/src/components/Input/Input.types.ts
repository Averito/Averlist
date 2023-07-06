import { ChangeEventHandler, KeyboardEventHandler } from 'react'

export type InputType = 'text' | 'number' | 'password' | 'email'

export interface InputProps {
	type?: InputType
	value: string
	onChange: ChangeEventHandler<HTMLInputElement>
	onKeyDown?: KeyboardEventHandler<HTMLInputElement>
	placeholder?: string
	name?: string
	width?: string
	label?: string
	margin?: string
	className?: string
}
