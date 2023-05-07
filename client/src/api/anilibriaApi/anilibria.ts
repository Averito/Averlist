import { QueryObject } from 'anilibria-api-wrapper'

export const queryObjectByDefault: QueryObject = {
	filter: ['id', 'names', 'description', 'posters', 'status', 'type', 'code'],
	limit: 30
}
