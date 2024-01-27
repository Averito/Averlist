import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class DiscordGuard extends AuthGuard('discord') {
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
