import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import { Averlist } from '@averlistApi/types'
import { errorToast } from '@helpers/toasts'
import { averlist } from '@averlistApi/averlist'
import { toast } from 'react-toastify'
import success = toast.success

class FavoriteCollectionsStore {
	@observable private _collections: Averlist.Collection[] = []
	@computed
	public get collections() {
		return this._collections
	}

	constructor() {
		makeObservable(this)
	}

	@action
	public async unFavoriteCollection(collectionId: string) {
		try {
			await averlist.collections.removeFavorite(collectionId)
			success('Коллекция удалена из избранного')

			runInAction(() => {
				this.removeCollection(collectionId)
			})
		} catch {
			errorToast('Что-то пошло не так, попробуйте позже')
		}
	}

	@action
	public async favoriteCollection(collectionId: string) {
		try {
			const newCollection = await averlist.collections.addFavorite(collectionId)
			success('Коллекция добавлена в избранное')

			runInAction(() => {
				this.addCollection(newCollection)
			})
		} catch {
			errorToast('Что-то пошло не так, попробуйте позже')
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
	public isFavorite(id: string) {
		return (
			this._collections.findIndex(collection => collection.id === id) !== -1
		)
	}
}

export default new FavoriteCollectionsStore()
