import { action, computed, observable, runInAction } from 'mobx'
import { Averlist } from '@averlistApi/types'
import { errorToast, successToast } from '@helpers/toasts'
import { averlist } from '@averlistApi/averlist'

class AnimeListStore {
	@observable private _animeList: Averlist.Anime[] = []

	@computed
	public get animeList() {
		return this._animeList
	}

	@computed
	public get anilibriaAnimeList() {
		return this._animeList.filter(anime => !!anime.anilibriaId)
	}

	@action
	public async create(anime: Averlist.NewAnime) {
		try {
			const createdAnime = await averlist.anime.create(anime)
			successToast('Аниме успешно добавлено в ваш список!')

			runInAction(() => {
				this.addToAnimeList(createdAnime)
			})
		} catch {
			errorToast('Не удалось добавить данное аниме в ваш список')
		}
	}

	@action
	public setAnimeList(animeList: Averlist.Anime[]) {
		this._animeList = animeList
	}

	@action
	public addToAnimeList(anime: Averlist.Anime) {
		this._animeList = [...this._animeList, anime]
	}

	@action
	public removeFromAnimeList(animeId: string) {
		this._animeList = this._animeList.filter(anime => anime.id !== animeId)
	}

	@action
	public editStatus(animeId: string, status: Averlist.AnimeStatus) {
		const animeIdx = this._animeList.findIndex(anime => anime.id === animeId)
		if (animeIdx === -1) return false

		this._animeList[animeIdx].status = status
		return true
	}
}

export default new AnimeListStore()
