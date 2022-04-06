import { api } from 'api'
import { Anime } from './types'

export const anime = {
	async get(userId: string) {
		return await api.get<Anime[]>(`/anime/${userId}`)
	},
	async create({ anime, userId }: { anime: Anime; userId: string }) {
		const newAnime: Anime = {
			name: anime.name,
			status: anime.status,
			userId
		}

		return await api.post<Anime, Anime>('/anime', newAnime)
	},
	async edit({ anime, id }: { anime: Anime; id: string }) {
		await api.put<Anime, Anime>(`/anime/${id}`, anime)
		return { anime, id }
	},
	async delete(id: string) {
		return await api.delete<Anime>(`/anime/${id}`)
	}
}
