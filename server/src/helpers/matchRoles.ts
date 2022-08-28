import { Role } from '@enums/role.enum'

export const matchRoles = (roles: Role[], currentRole: Role): boolean => {
	return roles.some(role => role === currentRole)
}
