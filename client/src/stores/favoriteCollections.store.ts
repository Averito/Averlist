import { action, computed, observable } from 'mobx'
import { Averlist } from '@averlistApi/types'

class FavoriteCollectionsStore {
	@observable private _collections: Averlist.Collection[] = []
	@computed
	public get collections() {
		return this._collections
	}

	@action
	public setCollections(collections: Averlist.Collection[]) {
		this._collections = collections
	}

	@action
	public addCollection(collection: Averlist.Collection) {
		this._collections.push(collection)
	}

	@action
	public removeCollection(id: string) {
		this._collections = this._collections.filter(
			collection => collection.id !== id
		)
	}

	@action
	public isFavorite(id: string) {
		return (
			this._collections.findIndex(collection => collection.id === id) !== -1
		)
	}
}

export default new FavoriteCollectionsStore()
