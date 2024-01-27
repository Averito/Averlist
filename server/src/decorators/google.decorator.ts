import { UseGuards } from '@nestjs/common'
import { GoogleGuard } from '@guards/google.guard'

export const Google = () => UseGuards(new GoogleGuard())
