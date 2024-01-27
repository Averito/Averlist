import { PassportSerializer } from '@nestjs/passport'
import { User } from '@prisma/client'
import { Done } from '../types/done.type'
import { PrismaService } from '../prisma.service'
import { Inject } from '@nestjs/common'

export class SessionSerializer extends PassportSerializer {
	constructor(
		@Inject('PRISMA_SERVICE') private readonly prismaService: PrismaService
	) {
		super()
	}
	serializeUser(user: User, done: Done) {
		done(null, user)
	}
	async deserializeUser(user: User, done: Done) {
		const dbUser = await this.prismaService.user.findUnique({
			where: { id: user.id }
		})
		return dbUser ? done(null, dbUser) : done(null, null)
	}
}
