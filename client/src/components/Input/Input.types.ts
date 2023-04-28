import { ChangeEventHandler } from 'react'

export type InputType = 'text' | 'number' | 'password' | 'email'

export interface InputProps {
	type?: InputType
	value: string
	onChange: ChangeEventHandler<HTMLInputElement>
	placeholder?: string
	name?: string
	width?: string
	label?: string
	margin?: string
}
