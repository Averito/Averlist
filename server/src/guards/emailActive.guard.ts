import { CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from '@prisma/client'
import { Request } from 'express'
import { PUBLIC_KEY } from '@decorators/public.decorator'

export class EmailActiveGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext) {
		const publicRoute = this.reflector.get<boolean>(
			PUBLIC_KEY,
			context.getHandler()
		)
		const request: Request = context.switchToHttp().getRequest()
		const user = request.user as User

		if (publicRoute) return true

		return user.emailActive
	}
}
