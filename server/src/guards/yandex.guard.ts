import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class YandexGuard extends AuthGuard('yandex') {
	constructor() {
		super()
	}

	public async canActivate(context: ExecutionContext) {
		const activate = (await super.canActivate(context)) as boolean
		const request = context.switchToHttp().getRequest()
		await super.logIn(request)
		return activate
	}
}
