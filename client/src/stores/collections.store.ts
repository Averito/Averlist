import { makeAutoObservable } from 'mobx'
import { Averlist } from '@averlistApi/types'

class CollectionsStore {
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

	public changeType(id: string, type: Averlist.CollectionType) {
		this._collections = this._collections.map(collection =>
			collection.id === id ? { ...collection, type } : collection
		)
	}

	public changeName(id: string, name: string) {
		this._collections = this._collections.map(collection =>
			collection.id === id ? { ...collection, name } : collection
		)
	}
}

export default new CollectionsStore()
