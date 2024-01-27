import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-yandex'
import { ConfigService } from '@nestjs/config'
import { Done } from '../types/done.type'
import { AuthService } from '../auth/auth.service'
import { yandexProfileToProfile } from '@helpers/transformProviderProfileToProfile'

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService
	) {
		super({
			clientID: configService.get('YANDEX_CLIENT_ID'),
			clientSecret: configService.get('YANDEX_CLIENT_SECRET'),
			callbackURL: configService.get('YANDEX_REDIRECT_URI')
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: Done
	) {
		const standardProfile = yandexProfileToProfile(profile)
		const user = await this.authService.validateUser(standardProfile)
		await this.authService.validateOAuth(user.id, accessToken, refreshToken)

		done(null, user)
	}
}
