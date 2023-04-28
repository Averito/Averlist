import { MouseEventHandler } from 'react'
import { Property } from 'csstype'
import Width = Property.Width

export interface ButtonProps {
	onClick?: MouseEventHandler<HTMLButtonElement>
	className?: string
	width?: Width
	disabled?: boolean
}
