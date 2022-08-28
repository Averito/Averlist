import { UseGuards } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { EmailActiveGuard } from '@guards/emailActive.guard'

export const EmailActive = () => {
	return UseGuards(new EmailActiveGuard(new Reflector()))
}
