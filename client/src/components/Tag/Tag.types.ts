import { MouseEventHandler } from 'react'

export interface TagProps {
	title: string
	checked: boolean
	onClick: MouseEventHandler<HTMLSpanElement>
}
