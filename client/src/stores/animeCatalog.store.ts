import { action, computed, makeObservable, observable } from 'mobx'
import { Title } from 'anilibria-api-wrapper'

import { uniqueIds } from '@helpers/uniqueIds'

class AnimeCatalogStore {
	@observable private _searchValue = ''
	@computed
	get searchValue() {
		return this._searchValue
	}

	@observable private _updatesTitleList: Title[] = []
	@computed
	get updatesTitleList() {
		return this._updatesTitleList
	}

	@observable private _searchTitleList: Title[] = []
	@computed
	get searchTitleList() {
		return this._searchTitleList
	}

	constructor() {
		makeObservable(this)
	}

	@action
	public setSearchValue = (value: string) => {
		this._searchValue = value
	}

	@action
	public reset = () => {
		this.resetUpdatesTitleList()
		this.resetSearchTitleList()
	}

	@action
	public resetUpdatesTitleList = () => {
		this._updatesTitleList = []
	}

	@action
	public resetSearchTitleList = () => {
		this._searchTitleList = []
	}

	@action
	public addToUpdatesTitleList = (newPartOfUpdatesTitleList: Title[]) => {
		this._updatesTitleList = uniqueIds<Title>([
			...this._updatesTitleList,
			...newPartOfUpdatesTitleList
		])
	}

	@action
	public addToSearchTitleList = (newPartOfSearchTitleList: Title[]) => {
		this._updatesTitleList = uniqueIds<Title>([
			...this._updatesTitleList,
			...newPartOfSearchTitleList
		])
	}
}

export default new AnimeCatalogStore()
