import { action, computed, observable, runInAction } from 'mobx'
import { Averlist } from '@averlistApi/types'
import { averlist } from '@averlistApi/averlist'
import { errorToast, successToast } from '@helpers/toasts'

class CollectionsStore {
	@observable private _collections: Averlist.Collection[] = []

	@computed
	public get collections() {
		return this._collections
	}

	@action
	public async createCollection(newCollection: Averlist.NewCollection) {
		try {
			const collection = await averlist.collections.create(newCollection)
			successToast(`Коллекция ${collection.name} успешно создана!`)

			runInAction(() => {
				this.addCollection(collection)
			})
		} catch {
			errorToast('Не удалось создать коллекцию')
		}
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
	public changeType(id: string, type: Averlist.CollectionType) {
		this._collections = this._collections.map(collection =>
			collection.id === id ? { ...collection, type } : collection
		)
	}

	@action
	public changeName(id: string, name: string) {
		this._collections = this._collections.map(collection =>
			collection.id === id ? { ...collection, name } : collection
		)
	}
}

export default new CollectionsStore()
