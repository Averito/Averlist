import { Averlist } from '@averlistApi/types'
import { axios } from '@averlistApi/averlist'

export const collections = {
	async my(): Promise<Averlist.Collection[]> {
		const response = await axios.get<Averlist.Collection[]>('/collection/my')
		return response.data
	},
	async all(): Promise<Averlist.Collection[]> {
		const response = await axios.get<Averlist.Collection[]>('/collection/all')
		return response.data
	},
	async myFavorites(): Promise<Averlist.Collection[]> {
		const response = await axios.get<Averlist.Collection[]>('/collection/my-favorites')
		return response.data
	},
	async create(newCollection: Averlist.NewCollection): Promise<Averlist.Collection> {
		const response = await axios.post<Averlist.Collection>('/collection', newCollection)
		return response.data
	},
	async addFavorite(collectionId: string): Promise<Averlist.Collection> {
		const response = await axios.post<Averlist.Collection>(`/collection/${collectionId}`)
		return response.data
	},
	async addPoster(poster: File, collectionId: string): Promise<Averlist.Collection> {
		const formData = new FormData()
		formData.set('poster', poster)

		const response = await axios.patch<Averlist.Collection>(`/collection/add-poster/${collectionId}`, formData)
		return response.data
	},
	async editCollection(editCollection: Averlist.EditCollection, collectionId: string): Promise<Averlist.Collection> {
		const response = await axios.patch<Averlist.Collection>(`/collection/${collectionId}`, editCollection)
		return response.data
	},
	async removeFavorite(collectionId: string): Promise<Averlist.Collection> {
		const response = await axios.delete<Averlist.Collection>(`/collection/remove-favorite/${collectionId}`)
		return response.data
	},
	async remove(collectionId: string): Promise<Averlist.Collection> {
		const response = await axios.delete<Averlist.Collection>(`/collection/${collectionId}`)
		return response.data
	}
}
