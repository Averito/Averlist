export interface CheckboxProps {
	id: string
	checked: boolean
	onChange: (checked: boolean) => unknown
	label?: string
}
