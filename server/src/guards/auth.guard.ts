import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PUBLIC_KEY } from '@decorators/public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<any> {
		const allow = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler())
		if (allow) return true

		const request = context.switchToHttp().getRequest()
		return request.isAuthenticated()
	}
}
