import { Injectable, UnauthorizedException } from '@nestjs/common'
import { genSalt, hash } from 'bcrypt'
import { PrismaService } from '../prisma.service'
import { NOT_AUTHORIZED } from './auth.constants'
import { StandardProfile } from '@helpers/transformProviderProfileToProfile'

@Injectable()
export class AuthService {
	constructor(private readonly prisma: PrismaService) {}

	public async validateUser(profile: StandardProfile) {
		if (!profile.id) throw new UnauthorizedException(NOT_AUTHORIZED)

		const user = await this.prisma.user.findUnique({
			where: { email: profile.email }
		})

		return user ? user : this.createUser(profile)
	}

	private async createUser({ avatar, name, email }: StandardProfile) {
		return this.prisma.user.create({
			data: {
				avatar,
				email,
				name,
				role: 'user'
			}
		})
	}

	public async validateOAuth(
		id: string,
		accessToken: string,
		refreshToken: string
	) {
		if (!id) throw new UnauthorizedException(NOT_AUTHORIZED)

		const accessTokenHash = await this.genHash(accessToken || '')
		const refreshTokenHash = await this.genHash(refreshToken || '')

		const oAuthSession = await this.prisma.oAuthSession.findUnique({
			where: { id }
		})

		return oAuthSession
			? this.updateOAuth(id, accessTokenHash, refreshTokenHash)
			: this.createOAuth(id, accessTokenHash, refreshTokenHash)
	}

	private async createOAuth(
		id: string,
		accessToken: string,
		refreshToken: string
	) {
		return this.prisma.oAuthSession.create({
			data: {
				id,
				accessToken,
				refreshToken
			}
		})
	}

	private async updateOAuth(
		id: string,
		accessToken: string,
		refreshToken: string
	) {
		return this.prisma.oAuthSession.update({
			where: {
				id
			},
			data: {
				accessToken,
				refreshToken
			}
		})
	}

	private async genHash(enteredData: string, rounds = 10): Promise<string> {
		const salt = await genSalt(rounds)
		return hash(enteredData, salt)
	}
}
