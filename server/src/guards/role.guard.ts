import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from '@prisma/client'
import { matchRoles } from '@helpers/matchRoles'
import { Role } from '@enums/role.enum'
import { ROLES_KEY } from '@decorators/role.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler())

		if (!roles) {
			return true
		}
		const request = context.switchToHttp().getRequest()
		const user: User = request.user
		return matchRoles(roles, user.role as Role)
	}
}
