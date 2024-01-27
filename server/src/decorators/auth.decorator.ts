import { UseGuards } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@guards/auth.guard'

export const Auth = () => {
	return UseGuards(new AuthGuard(new Reflector()))
}
