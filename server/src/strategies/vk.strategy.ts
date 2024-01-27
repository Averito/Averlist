import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-vkontakte'
import { ConfigService } from '@nestjs/config'
import { Done } from '../types/done.type'
import { AuthService } from '../auth/auth.service'
import { vkProfileToProfile } from '@helpers/transformProviderProfileToProfile'

@Injectable()
export class VkStrategy extends PassportStrategy(Strategy, 'vk') {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService
	) {
		super(
			{
				clientID: configService.get('VK_CLIENT_ID'),
				clientSecret: configService.get('VK_CLIENT_SECRET'),
				callbackURL: configService.get('VK_REDIRECT_URI'),
				profileFields: ['id', 'displayName', 'photos', 'emails'],
				scope: ['email'],
				lang: 'ru'
			},
			async (
				accessToken: string,
				refreshToken: string,
				profile: Profile,
				done: Done
			) => {
				const standardProfile = vkProfileToProfile(profile)
				const user = await this.authService.validateUser(standardProfile)
				await this.authService.validateOAuth(user.id, accessToken, refreshToken)

				done(null, user)
			}
		)
	}
}
