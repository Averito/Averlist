import { UseGuards } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AccessJwtGuard } from '@guards/accessJwt.guard'

export const AccessJwt = () => {
	return UseGuards(new AccessJwtGuard(new Reflector()))
}
