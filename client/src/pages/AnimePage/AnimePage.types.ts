import { Title } from 'anilibria-api-wrapper'
import { DetectDeviceReturn } from '@helpers/detectDevice'

export interface AnimePageProps {
	title: Title
	devices: DetectDeviceReturn
}
