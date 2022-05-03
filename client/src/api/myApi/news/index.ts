import { api } from 'api'
import { News } from './types'

type EditType = { newsId: string; news: News }

export const news = {
	async getAll() {
		return await api.get<News[]>('/news')
	},
	async create(news: FormData) {
		return await api.post<FormData, News>('/news', news)
	},
	async edit({ newsId, news }: EditType) {
		return await api.put<News, News>(`/news/${newsId}`, news)
	},
	async delete(newsId: string) {
		await api.delete<string>(`/news/${newsId}`)
		return newsId
	}
}
