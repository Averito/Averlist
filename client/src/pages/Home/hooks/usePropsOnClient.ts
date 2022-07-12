import { Title } from '@anilibriaApi/types'
import { useEffect, useState } from 'react'
import { reverseArray } from '@helpers/reverseArray'
import { QueryObject } from '@helpers/generateQueryParamsString'
import { anilibria } from '@anilibriaApi/anilibria'
import { firstSeriesToSeriesUsually } from '@helpers/firstSeriesToSeriesUsually'

export const usePropsOnClient = (
	updatesTitleList: Title[],
	changesTitleList: Title[],
	firstFiveTitles: Title[]
) => {
	const [reversedUpdatesTitleList, setReversedUpdatesTitleList] = useState<
		Title[]
	>(reverseArray(updatesTitleList))
	const [newChangesTitleList, setNewChangesTitleList] =
		useState<Title[]>(changesTitleList)
	const [newFirstFiveTitles, setNewFirstFiveTitles] =
		useState<Title[]>(firstFiveTitles)

	useEffect(() => {
		const asyncWrapper = async () => {
			const objectParams: QueryObject = {
				filter: [
					'id',
					'names',
					'description',
					'posters',
					'status',
					'type',
					'code'
				],
				limit: 30
			}
			const objectParamsForSlider: QueryObject = {
				filter: ['id', 'names', 'description', 'player', 'status', 'type'],
				limit: 5
			}

			const updatesTitleList = await anilibria.getUpdates(objectParams)
			const changesTitleList = await anilibria.getChanges(objectParams)
			let firstFiveTitles = await anilibria.getChanges(objectParamsForSlider)
			firstFiveTitles = firstSeriesToSeriesUsually(firstFiveTitles, 5)

			setReversedUpdatesTitleList(reverseArray(updatesTitleList))
			setNewChangesTitleList(changesTitleList)
			setNewFirstFiveTitles(firstFiveTitles)
		}
		asyncWrapper()
	})

	return {
		reversedUpdatesTitleList,
		newChangesTitleList,
		newFirstFiveTitles
	}
}
