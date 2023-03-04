import { makeAutoObservable } from 'mobx'
import { Averlist } from '@averlistApi/types'

class FavoriteCollectionsStore {
	private _collections: Averlist.Collection[] = []
	public get collections() {
		return this._collections
	}

	constructor() {
		makeAutoObservable(this)
	}

	public setCollections(collections: Averlist.Collection[]) {
		this._collections = collections
	}

	public addCollection(collection: Averlist.Collection) {
		this._collections.push(collection)
	}

	public removeCollection(id: string) {
		this._collections = this._collections.filter(
			collection => collection.id !== id
		)
	}

	public isFavorite(id: string) {
		return (
			this._collections.findIndex(collection => collection.id === id) !== -1
		)
	}
}

export default new FavoriteCollectionsStore()
