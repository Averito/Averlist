import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

import { UserEntity } from '../../user/user.entity'

export type JwtPayload = Omit<
	UserEntity,
	| 'isActive'
	| 'friendList'
	| 'refreshTokenHash'
	| 'animeList'
	| 'meInvitations'
	| 'myInvitations'
>

@Injectable()
export class AccessTStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('JWT_ACCESS_SECRET')
		})
	}

	validate(payload: JwtPayload) {
		return payload
	}
}
