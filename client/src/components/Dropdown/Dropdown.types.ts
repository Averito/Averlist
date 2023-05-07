import { MouseEventHandler } from 'react'

export interface DropdownMenu {
	id: number
	label: string
	href?: string
	onClick?: MouseEventHandler<HTMLDivElement>
}

export interface DropdownProps {
	options: DropdownMenu[]
	clickMod?: boolean
	margin?: string
	onOpen?: () => unknown
	onClose?: () => unknown
}
