import { action, computed, makeObservable, observable, runInAction } from 'mobx'

import { Averlist } from '@averlistApi/types'
import defaultAvatar from '@assets/images/defaultAvatar.png'
import { getCurrentAvatar } from '@helpers/getCurrentAvatar'
import { getCurrentName } from '@helpers/getCurrentName'
import { errorToast, successToast } from '@helpers/toasts'
import { averlist } from '@averlistApi/averlist'

class UserStore {
	@observable public isAuth = true
	@observable public user: Averlist.User = {} as Averlist.User

	@observable private _currentAvatar: string = defaultAvatar.src
	@computed
	public get currentAvatar(): string {
		return this._currentAvatar
	}

	@observable private _currentName = 'Гость'
	@computed
	public get currentName(): string {
		return this._currentName
	}

	@observable private _path = ''
	@computed
	public get path() {
		return this._path
	}

	constructor() {
		makeObservable(this)
	}

	@action
	public userAuth() {
		this.isAuth = true
	}

	@action
	public userNotAuth() {
		this.isAuth = false
	}

	@action
	public setUser(user: Averlist.User) {
		this.user = user

		this.setCurrentAvatar(user.avatar)
		this.setCurrentName(user.name)
	}

	@action
	public logout() {
		this.isAuth = false
		this.user = {} as Averlist.User
		this._currentAvatar = defaultAvatar.src
		this._currentName = 'Гость'
	}
	@action
	public setCurrentAvatar(avatar?: string) {
		this._currentAvatar = getCurrentAvatar(avatar)
		if (avatar) this.user.avatar = avatar
	}

	@action
	public setCurrentName(name?: string) {
		this._currentName = getCurrentName(name)
		if (name) this.user.name = name
	}

	@action
	public setPath(path: string) {
		this._path = path
	}
}

export default new UserStore()
