import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { Role } from '@enums/role.enum'
import { RolesGuard } from '@guards/role.guard'

export const ROLES_KEY = 'roles'

const RolesDecorator = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
export const Roles = (...roles: Role[]) => {
	return applyDecorators(RolesDecorator(...roles), UseGuards(RolesGuard))
}
