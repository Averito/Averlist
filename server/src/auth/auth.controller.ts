import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { AuthService } from './auth.service'
import { UserDto } from '../user/DTO/user.dto'
import { JwtAuthGuard } from './guards/accessT.guard'
import { JwtRefreshAuthGuard } from './guards/refreshT.guard'

@ApiTags('Auth')
@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('auth')
	async loginUser(@Body() user: UserDto) {
		const validateUser = await this.authService.validateUser(user)
		return this.authService.authUser(validateUser)
	}

	@Get('auth-check')
	@UseGuards(JwtAuthGuard)
	authCheck(@Req() req) {
		return this.authService.checkAuth(req.headers.authorization.split(' ')[1])
	}

	@Get('activate/:activationLink')
	activateUser(@Param('activationList') activationLink: string) {
		return this.authService.activateUser(activationLink)
	}

	@Post('registration')
	@UsePipes(new ValidationPipe({ transform: true }))
	async registrationUser(@Body() user: UserDto) {
		return await this.authService.createUser(user)
	}

	@Post('logout')
	@UseGuards(JwtAuthGuard)
	logout(@Body('userId') userId: number) {
		return this.authService.logout(userId)
	}

	@Post('refresh')
	@UseGuards(JwtRefreshAuthGuard)
	refreshTokens(@Req() req: Request) {
		const user = req.user
		return this.authService.refreshTokens(user['id'], user['refreshToken'])
	}

	@Post('restore-password')
	@UsePipes(new ValidationPipe({ transform: true }))
	restorePassword(@Query('email') email: string) {
		return this.authService.restorePassword(email)
	}

	@Post('restore-password')
	@UsePipes(new ValidationPipe({ transform: true }))
	forgotPasswordUser(@Body() user: UserDto & { oldPassword: string }) {
		return this.authService.updatePassword(user)
	}
}
