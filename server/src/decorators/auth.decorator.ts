import { applyDecorators } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { AccessJwt } from './accessJwt.decorator'
import { EmailActive } from './emailActive.decorator'

export const Auth = () => {
	return applyDecorators(AccessJwt(), EmailActive(), ApiBearerAuth())
}
