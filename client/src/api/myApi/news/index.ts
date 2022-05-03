import { api } from 'api'
import { News, EditType } from './types'

export const news = {
	async getAll() {
		return await api.get<News[]>('/news')
	},
	async create(news: FormData) {
		return await api.post<FormData, News>('/news', news)
	},
	async edit({ newsId, news }: EditType) {
		return await api.put<Omit<News, '_id'>, News>(`/news/${newsId}`, news)
	},
	async delete(newsId: string) {
		await api.delete<string>(`/news/${newsId}`)
		return newsId
	}
}
