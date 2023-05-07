import { Title } from '@anilibriaApi/types'

export interface DescriptionTagProps {
	type: 'string' | 'series' | 'length' | 'status'
	title: Title
}
