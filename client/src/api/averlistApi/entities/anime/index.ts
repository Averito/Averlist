import { Averlist } from '@averlistApi/types'
import { axios } from '@averlistApi/averlist'
import { AnimeStatus } from '@averlistApi/entities/anime/types'

export const anime = {
	async getByAnilibriaId(anilibriaId: number): Promise<Averlist.Anime[]> {
		const response = await axios.get<Averlist.Anime[]>(`/anime/${anilibriaId}`)
		return response.data
	},
	async list(accessToken = ''): Promise<Averlist.Anime[]> {
		const response = await axios.get<Averlist.Anime[]>('/anime', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
		return response.data
	},
	async create(newAnime: Averlist.NewAnime): Promise<Averlist.Anime> {
		const response = await axios.post<Averlist.Anime>('/anime', newAnime)
		return response.data
	},
	async editStatus(
		animeId: string,
		newStatus: AnimeStatus
	): Promise<Averlist.Anime> {
		const response = await axios.patch<Averlist.Anime>(`/anime/${animeId}`, {
			newStatus
		})
		return response.data
	},
	async remove(animeId: string): Promise<Averlist.Anime> {
		const response = await axios.delete<Averlist.Anime>(`/anime/${animeId}`)
		return response.data
	}
}
