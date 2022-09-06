import { StaticImageData } from 'next/image'
import { makeAutoObservable } from 'mobx'

import { Averlist } from '@averlistApi/types'
import defaultAvatar from '@assets/images/defaultAvatar.png'

const AVERLIST_AVATARS_URI = process.env.NEXT_PUBLIC_AVERLIST_AVATARS_URI

class AuthStore {
	public isAuth = false
	public user: Averlist.User = {} as Averlist.User

	private _currentAvatar: string = defaultAvatar.src
	public get currentAvatar(): string | StaticImageData {
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
	private setCurrentAvatar(avatar?: string) {
		if (!avatar) return (this._currentAvatar = defaultAvatar.src)
		if (avatar.includes('https')) return (this._currentAvatar = avatar)
		this._currentAvatar = `${AVERLIST_AVATARS_URI}${avatar}`
	}
	private setCurrentName(name?: string) {
		if (name) this._currentName = name
	}
}

export default new AuthStore()
