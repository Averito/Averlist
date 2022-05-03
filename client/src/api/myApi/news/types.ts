export interface News {
	_id?: string
	picture: string
	description: string
	lastUpdate: number
}

export type EditType = { newsId: string; news: Omit<News, '_id'> }
