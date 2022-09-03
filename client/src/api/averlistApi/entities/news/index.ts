import { Averlist } from '@averlistApi/types'
import { axios } from '@averlistApi/averlist'

export const news = {
	async all(accessToken = ''): Promise<Averlist.News[]> {
		const response = await axios.get<Averlist.News[]>('/news', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
		return response.data
	},
	async create(
		title: string,
		text: string,
		image: File
	): Promise<Averlist.News> {
		const formData = new FormData()
		formData.set('title', title)
		formData.set('text', text)
		formData.set('image', image)

		const response = await axios.post<Averlist.News>('/news', formData)
		return response.data
	},
	async setImage(newsId: string, image: File): Promise<Averlist.News> {
		const formData = new FormData()
		formData.set('image', image)

		const response = await axios.patch<Averlist.News>(
			`/news/set-image/${newsId}`,
			formData
		)
		return response.data
	},
	async editNews(
		newsId: string,
		title?: string,
		text?: string
	): Promise<Averlist.News> {
		const editNews = {
			title,
			text
		}
		const response = await axios.patch<Averlist.News>(
			`/news/${newsId}`,
			editNews
		)
		return response.data
	},
	async remove(newsId: string): Promise<Averlist.News> {
		const response = await axios.delete<Averlist.News>(`/news/${newsId}`)
		return response.data
	}
}
