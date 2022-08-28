import { applyDecorators } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { Role } from '@enums/role.enum'
import { Roles } from './role.decorator'
import { AccessJwt } from './accessJwt.decorator'
import { EmailActive } from './emailActive.decorator'

export const Auth = (...roles: Role[]) => {
	return applyDecorators(
		Roles(...roles),
		AccessJwt(),
		EmailActive(),
		ApiBearerAuth()
	)
}
