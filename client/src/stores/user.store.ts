import { makeAutoObservable } from 'mobx'

import { Averlist } from '@averlistApi/types'
import defaultAvatar from '@assets/images/defaultAvatar.png'
import { getCurrentAvatar } from '@helpers/getCurrentAvatar'
import { getCurrentName } from '@helpers/getCurrentName'

const AVERLIST_AVATARS_URI = process.env.NEXT_PUBLIC_AVERLIST_AVATARS_URI

class UserStore {
	public isAuth = false
	public user: Averlist.User = {} as Averlist.User

	private _currentAvatar: string = defaultAvatar.src
	public get currentAvatar(): string {
		return this._currentAvatar
	}

	private _currentName = 'Гость'
	public get currentName(): string {
		return this._currentName
	}

	constructor() {
		makeAutoObservable(this)
	}

	public userAuth() {
		this.isAuth = true
	}
	public setUser(user: Averlist.User) {
		this.user = user

		this.setCurrentAvatar(user.avatar)
		this.setCurrentName(user.name)
	}
	public logout() {
		this.isAuth = false
		this.user = {} as Averlist.User
		this._currentAvatar = defaultAvatar.src
		this._currentName = 'Гость'
	}
	public setCurrentAvatar(avatar?: string) {
		this._currentAvatar = getCurrentAvatar(avatar)
		if (avatar) this.user.avatar = avatar
	}
	public setCurrentName(name?: string) {
		this._currentName = getCurrentName(name)
		if (name) this.user.name = name
	}
	public addToAnimeList(anime: Averlist.Anime) {
		this.user.anime_list = [...(this.user.anime_list || []), anime]
	}
}

export default new UserStore()
