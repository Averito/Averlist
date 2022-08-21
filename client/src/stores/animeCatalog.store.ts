import { makeAutoObservable } from 'mobx'

import { Title } from '@anilibriaApi/types'
import { uniqueIds } from '@helpers/uniqueIds'

class AnimeCatalogStore {
	private _searchValue = ''
	get searchValue() {
		return this._searchValue
	}

	private _updatesTitleList: Title[] = []
	get updatesTitleList() {
		return this._updatesTitleList
	}

	private _searchTitleList: Title[] = []
	get searchTitleList() {
		return this._searchTitleList
	}

	constructor() {
		makeAutoObservable(this)
	}

	public setSearchValue = (value: string) => {
		this._searchValue = value
	}

	public reset = () => {
		this.resetUpdatesTitleList()
		this.resetSearchTitleList()
	}
	public resetUpdatesTitleList = () => {
		this._updatesTitleList = []
	}
	public resetSearchTitleList = () => {
		this._searchTitleList = []
	}

	public addToUpdatesTitleList = (newPartOfUpdatesTitleList: Title[]) => {
		this._updatesTitleList = uniqueIds<Title>([
			...this._updatesTitleList,
			...newPartOfUpdatesTitleList
		])
	}
	public addToSearchTitleList = (newPartOfSearchTitleList: Title[]) => {
		this._updatesTitleList = uniqueIds<Title>([
			...this._updatesTitleList,
			...newPartOfSearchTitleList
		])
	}
}

export default new AnimeCatalogStore()
