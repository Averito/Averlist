import { Status, Statuses } from 'api/myApi/anime/types'

const statuses: Statuses[] = [
	'Просмотренно',
	'Смотрю',
	'Запланированно',
	'Выходит',
	'Заброшенно'
]

export const selectStatus = (status: Status) => {
	for (let idx = 0; idx < statuses.length; idx++) {
		if (status === idx) return statuses[idx]
	}
}

export const selectStatusToNumber = (status: string): Status => {
	for (let idx = 0; idx < statuses.length; idx++) {
		if (status === statuses[idx]) return idx as Status
	}
	return 0
}

export const selectStatusColor = (status: Status) => {
	if (status === 0) return 'green'
	if (status === 1) return 'cyan'
	if (status === 2) return 'volcano'
	if (status === 3) return 'magenta'
	if (status === 4) return 'red'
}
