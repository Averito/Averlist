import { Schedule, Title } from 'anilibria-api-wrapper'

export interface HomeProps {
	updatesTitleList: Title[]
	changesTitleList: Title[]
	firstFiveTitles: Title[]
	scheduleOfWeek: Schedule[]
}
