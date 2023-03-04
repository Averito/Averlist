import { Averlist } from '@averlistApi/types'

export class CollectionsCreateAnimeListStore {
	private _animeList: Averlist.Anime[] = []
	public get animeList() {
		return this._animeList
	}

	public add(anime: Averlist.Anime): void {
		this._animeList.push(anime)
	}

	public remove(id: string): void {
		this._animeList = this._animeList.filter(anime => anime.id !== id)
	}

	public contains(id: string): boolean {
		return this._animeList.findIndex(anime => anime.id === id) !== -1
	}

	public clear(): void {
		this._animeList = []
	}
}

export default new CollectionsCreateAnimeListStore()
