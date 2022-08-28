import { User } from '@prisma/client'
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../prisma.service'
import { JwtPayload } from '@interfaces/jwtPayload.interface'

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(
	Strategy,
	'access-jwt-token'
) {
	constructor(
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService
	) {
		super({
			secretOrKey: configService.get('ACCESS_JWT_SECRET'),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
		})
	}

	async validate(payload: JwtPayload): Promise<User> {
		const { userId } = payload

		const user = await this.prisma.user.findUnique({ where: { id: userId } })
		if (!user) throw new UnauthorizedException(HttpStatus.UNAUTHORIZED)

		return user
	}
}
