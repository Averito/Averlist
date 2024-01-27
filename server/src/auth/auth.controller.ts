import { Controller, Get, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { Google } from '@decorators/google.decorator'
import { Yandex } from '@decorators/yandex.decorator'
import { Discord } from '@decorators/discord.decorator'
import { Vk } from '@decorators/vk.decorator'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor() {}

	@Discord()
	@Get('discord')
	async discordOAuth() {
		return 'Discord Auth'
	}

	@Discord()
	@Get('callback/discord')
	async discordRedirect(@Res() response: Response) {
		response.status(301)
		return response.redirect('/lk')
	}

	@Vk()
	@Get('vk')
	async vkOAuth() {
		return 'Vkontakte Auth'
	}

	@Vk()
	@Get('callback/vk')
	async vkRedirect(@Res() response: Response) {
		response.status(301)
		return response.redirect('/lk')
	}

	@Google()
	@Get('google')
	async googleOAuth() {
		return 'Google Auth'
	}

	@Google()
	@Get('callback/google')
	async googleRedirect(@Res() response: Response) {
		response.status(301)
		return response.redirect('/lk')
	}

	@Yandex()
	@Get('yandex')
	async yandexOAuth() {
		return 'Yandex Auth'
	}

	@Yandex()
	@Get('callback/yandex')
	async yandexRedirect(@Res() response: Response) {
		response.status(301)
		return response.redirect('/lk')
	}
}
