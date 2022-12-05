import { makeAutoObservable } from 'mobx'
import { Averlist } from '@averlistApi/types'

class AnimeListStore {
	private _animeList: Averlist.Anime[] = []
	public get animeList() {
		return this._animeList
	}

	constructor() {
		makeAutoObservable(this)
	}

	public setAnimeList(animeList: Averlist.Anime[]) {
		this._animeList = animeList
	}

	public addToAnimeList(anime: Averlist.Anime) {
		this._animeList = [...this._animeList, anime]
	}

	public removeFromAnimeList(animeId: string) {
		this._animeList = this._animeList.filter(anime => anime.id !== animeId)
	}

	public editStatus(animeId: string, status: Averlist.AnimeStatus) {
		const animeIdx = this._animeList.findIndex(anime => anime.id === animeId)
		if (animeIdx === -1) return false

		this._animeList[animeIdx].status = status
		return true
	}
}

export default new AnimeListStore()
