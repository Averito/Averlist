import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-discord'
import { ConfigService } from '@nestjs/config'
import { Done } from '../types/done.type'
import { AuthService } from '../auth/auth.service'
import { discordProfileToProfile } from '@helpers/transformProviderProfileToProfile'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService
	) {
		super({
			clientID: configService.get('DISCORD_CLIENT_ID'),
			clientSecret: configService.get('DISCORD_CLIENT_SECRET'),
			callbackURL: configService.get('DISCORD_REDIRECT_URI'),
			scope: ['identify', 'email']
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: Done
	) {
		const standardProfile = discordProfileToProfile(profile)
		const user = await this.authService.validateUser(standardProfile)
		await this.authService.validateOAuth(user.id, accessToken, refreshToken)

		done(null, user)
	}
}
