import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client'

export const CurrentUser = createParamDecorator(
	(data: string, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user: User = request.user

		return user
	}
)
