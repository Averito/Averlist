import { ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { PUBLIC_KEY } from '@decorators/public.decorator'

export class AccessJwtGuard extends AuthGuard('access-jwt-token') {
	constructor(private readonly reflector: Reflector) {
		super()
	}

	canActivate(context: ExecutionContext) {
		const allow = this.reflector.get<string>(PUBLIC_KEY, context.getHandler())

		if (allow) {
			return true
		}

		return super.canActivate(context)
	}
}
