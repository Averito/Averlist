import { Averlist } from '@averlistApi/types'
import { AccessToken, LoginResponse, RegistrationResponse } from '@averlistApi/entities/auth/types'
import { axios } from '@averlistApi/averlist'

export const auth = {
	async registration(
		user: Averlist.Registration
	): Promise<RegistrationResponse> {
		const response = await axios.post<RegistrationResponse>(
			'/auth/registration',
			user
		)
		return response.data
	},
	async login(loginData: Averlist.Login): Promise<LoginResponse> {
		const response = await axios.patch<LoginResponse>('/auth/login', loginData)
		return response.data
	},
	async logout(): Promise<Averlist.User> {
		const response = await axios.patch<Averlist.User>('/auth/logout')
		return response.data
	},
	async resetPassword(
		resetPasswordData: Averlist.ResetPassword
	): Promise<Averlist.User> {
		const response = await axios.patch<Averlist.User>(
			'/auth/reset-password',
			resetPasswordData
		)
		return response.data
	},
	async changePassword(
		changePasswordData: Averlist.ChangePassword
	): Promise<Averlist.User> {
		const response = await axios.patch<Averlist.User>(
			'/auth/reset-password',
			changePasswordData
		)
		return response.data
	},
	async getAccess(refreshToken: string): Promise<AccessToken> {
		const response = await axios.get<AccessToken>('/auth/get-access', {
			headers: {
				authorization: `Bearer ${refreshToken}`
			}
		})
		return response.data
	}
}
