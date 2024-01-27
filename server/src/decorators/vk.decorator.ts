import { UseGuards } from '@nestjs/common'
import { VkGuard } from '@guards/vk.guard'

export const Vk = () => UseGuards(new VkGuard())
