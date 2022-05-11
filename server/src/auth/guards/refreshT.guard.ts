import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
	canActivate(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context)
		const { req } = ctx.getContext()
		return super.canActivate(new ExecutionContextHost([req]))
	}
}
