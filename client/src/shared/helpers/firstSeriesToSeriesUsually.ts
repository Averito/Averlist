import { Series, SeriesUsually, Title } from '@anilibriaApi/types'

export const firstSeriesToSeriesUsually = (
	titleList: Title[],
	limit = titleList.length
) => {
	const seriesArr: SeriesUsually[] = []
	const titleListCopy = JSON.parse(JSON.stringify(titleList)) as Title[]

	for (let idx = 0; idx < limit; idx++) {
		if (titleList[idx].player.playlist) {
			const oneSeries = Object.entries<SeriesUsually>(
				titleList[idx].player.playlist as Series
			)
			titleListCopy[idx].player.playlist = [oneSeries[0][1]]
		}
	}

	return titleListCopy
}
