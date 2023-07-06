import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import { Averlist } from '@averlistApi/types'
import { averlist } from '@averlistApi/averlist'
import { uniqueIds } from '@helpers/uniqueIds'

class CollectionCatalogStore {
	@observable private _collections: Averlist.Collection[] = []

	@computed
	public get collections() {
		return this._collections
	}

	@observable private _searchValue: string = ''

	@computed
	public get searchValue() {
		return this._searchValue
	}

	public set searchValue(value: string) {
		this._searchValue = value
	}

	constructor() {
		makeObservable(this)
	}

	@action
	public async searchCollection(
		currentPage: number,
		pageSize: number,
		searchValue: string,
		addToCollections: boolean
	) {
		const collections = await averlist.collections.all({
			page: currentPage,
			pageSize,
			search: searchValue
		})

		runInAction(() => {
			if (addToCollections) return this.addToCollections(collections)
			this.setCollections(collections)
		})
	}

	@action
	public setCollections(collections: Averlist.Collection[]) {
		this._collections = collections
	}

	@action addToCollections(collections: Averlist.Collection[]) {
		this._collections = uniqueIds<Averlist.Collection>([
			...this._collections,
			...collections
		])
	}
}

export default new CollectionCatalogStore()
