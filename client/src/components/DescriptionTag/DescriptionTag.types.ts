import { Title } from 'anilibria-api-wrapper'

export interface DescriptionTagProps {
	type: 'string' | 'series' | 'length' | 'status'
	title: Title
}
