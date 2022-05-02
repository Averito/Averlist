export type Resolutions = 'hd' | 'sd'

export interface localStorageAnimeData {
	series: number
	timing: number
}

export interface ProgressPlayer {
	loaded: number
	loadedSeconds: number
	played: number
	playedSeconds: number
}
