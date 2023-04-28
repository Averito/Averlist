import { Property } from 'csstype'
import Margin = Property.Margin

export interface AutocompleteMenu {
	id: number | string
	name: string
}

export interface AutocompleteProps {
	value: string
	onChange: (value: string) => unknown
	onSelect?: (autocompleteMenu: AutocompleteMenu) => unknown
	placeholder: string
	name: string
	width?: string
	menuList: AutocompleteMenu[]
	maxMenuListLength?: number
	margin?: Margin
}
