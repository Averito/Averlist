import { UseGuards } from '@nestjs/common'
import { DiscordGuard } from '@guards/discord.guard'

export const Discord = () => UseGuards(new DiscordGuard())
