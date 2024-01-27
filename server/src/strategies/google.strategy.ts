import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-google-oauth20'
import { ConfigService } from '@nestjs/config'
import { Done } from '../types/done.type'
import { AuthService } from '../auth/auth.service'
import { googleProfileToProfile } from '@helpers/transformProviderProfileToProfile'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService
	) {
		super({
			clientID: configService.get('GOOGLE_CLIENT_ID'),
			clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
			callbackURL: configService.get('GOOGLE_REDIRECT_URI'),
			scope: ['profile', 'email']
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: Done
	) {
		const standardProfile = googleProfileToProfile(profile)
		const user = await this.authService.validateUser(standardProfile)
		await this.authService.validateOAuth(user.id, accessToken, refreshToken)

		done(null, user)
	}
}
