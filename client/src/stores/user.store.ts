import { action, computed, observable, runInAction } from 'mobx'

import { Averlist } from '@averlistApi/types'
import defaultAvatar from '@assets/images/defaultAvatar.png'
import { getCurrentAvatar } from '@helpers/getCurrentAvatar'
import { getCurrentName } from '@helpers/getCurrentName'
import { errorToast, successToast } from '@helpers/toasts'
import { averlist } from '@averlistApi/averlist'

class UserStore {
	@observable public isAuth = false
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

	@action
	public async registration(body: Averlist.Registration, showError = true) {
		try {
			const registrationResponse = await averlist.auth.registration(body)

			if (body.emailActive) {
				successToast('Регистрация прошло успешно')
			} else {
				successToast(
					'Регистрация прошла успешно, на почту отправлено письмо о подтверждении (В течении 2ух минут)'
				)
			}

			runInAction(() => {
				this.userAuth()
				this.setUser(registrationResponse.user)
			})
		} catch {
			if (!showError) return
			errorToast(
				'Регистрация не удалась, проверьте введённые данные или попробуйте позже'
			)
		}
	}

	@action
	public async login(body: Averlist.Login) {
		try {
			await averlist.auth.login(body)
			const me = await averlist.users.me()

			successToast('Добро пожаловать, мой Господин')

			runInAction(() => {
				this.userAuth()
				this.setUser(me)
			})
		} catch {
			errorToast(
				'Вход не удался, проверьте введённые данные или попробуйте позже'
			)
		}
	}

	@action
	public userAuth() {
		this.isAuth = true
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
}

export default new UserStore()
