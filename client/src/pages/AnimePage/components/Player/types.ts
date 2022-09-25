export type Quality = 'sd' | 'hd' | 'fhd'

export interface SeriesInfo {
	series: number
	quality: Quality
	time: number
}
