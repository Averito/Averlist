import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { UserDto } from '../user/DTO/user.dto'
import { JwtAuthGuard } from './guards/jwt.guard'

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
	async authCheck(@Req() req) {
		return this.authService.checkAuth(req.headers.authorization.split(' ')[1])
	}

	@Post('registration')
	@UsePipes(new ValidationPipe({ transform: true }))
	registrationUser(@Body() user: UserDto) {
		return this.authService.registrationUser(user)
	}

	// @Post('forgot-password')
	// @UsePipes(new ValidationPipe({ transform: true }))
	// forgotPasswordUser(@Body() user: UserDto & { oldPassword: string }) {
	// 	return this.authService.forgotPassword(user)
	// }

	@Post('restore-password')
	@UsePipes(new ValidationPipe({ transform: true }))
	forgotPasswordUser(@Body() user: UserDto & { oldPassword: string }) {
		return this.authService.forgotPassword(user)
	}
}
