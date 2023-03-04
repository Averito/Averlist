import { makeAutoObservable, runInAction } from 'mobx'
import { Averlist } from '@averlistApi/types'
import { averlist } from '@averlistApi/averlist'
import { errorToast, successToast } from '@helpers/toasts'
import { toast } from 'react-toastify'
import success = toast.success

class CollectionsStore {
	private _collections: Averlist.Collection[] = []
	public get collections() {
		return this._collections
	}

	constructor() {
		makeAutoObservable(this)
	}

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
