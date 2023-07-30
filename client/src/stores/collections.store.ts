import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import { Averlist } from '@averlistApi/types'
import { averlist } from '@averlistApi/averlist'
import { errorToast, successToast } from '@helpers/toasts'

class CollectionsStore {
	@observable private _collections: Averlist.Collection[] = []

	@computed
	public get collections() {
		return this._collections
	}

	constructor() {
		makeObservable(this)
	}

	@action
	public async createCollection(newCollection: Averlist.NewCollection) {
		const collection = await averlist.collections.create(newCollection)
		successToast(`Коллекция ${collection.name} успешно создана!`)

		runInAction(() => {
			this.addCollection(collection)
		})
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
	public async removeCollection(id: string) {
		const collection = await averlist.collections.remove(id)
		successToast(`Коллекция "${collection.name}" успешно удалена!`)

		runInAction(() => {
			this._collections = this._collections.filter(
				collection => collection.id !== id
			)
		})
	}

	@action
	public async changeType(id: string, type: Averlist.CollectionType) {
		try {
			const collection = this._collections.find(
				collection => collection.id === id
			)
			if (!collection) return errorToast('Такой коллекции не существует')

			const editCollection = {
				...collection,
				type
			}

			const { type: newType } = await averlist.collections.editCollection(
				editCollection,
				id
			)

			runInAction(() => {
				this._collections = this._collections.map(collection =>
					collection.id === id ? { ...collection, type: newType } : collection
				)
			})
		} catch {
			errorToast('Что-то пошло не так, попробуйте позже')
		}
	}

	@action
	public async changeNameAsync(id: string, name: string) {
		try {
			await averlist.collections.editCollection({ name }, id)

			runInAction(() => {
				this.changeName(id, name)
			})
		} catch {
			errorToast('Что-то пошло не так, попробуйте позже')
			throw Error('Something went wrong')
		}
	}

	@action
	public changeName(id: string, name: string) {
		this._collections = this._collections.map(collection =>
			collection.id === id ? { ...collection, name } : collection
		)
	}
}

export default new CollectionsStore()
