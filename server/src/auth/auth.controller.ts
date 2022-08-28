import {
	Body,
	Controller,
	Get,
	Headers,
	Param,
	Patch,
	Post,
	Query,
	UseGuards
} from '@nestjs/common'
import { User } from '@prisma/client'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { CurrentUser } from '@decorators/user.decorator'
import { Login, Registration } from './auth.interfaces'
import { RefreshJwtGuard } from '@guards/refreshJwt.guard'
import { UserDto } from '@DTO/user.dto'
import { RegistrationResponseDto } from '@DTO/registrationResponse.dto'
import { LoginBodyDto } from '@DTO/loginBody.dto'
import { LoginResponseDto } from '@DTO/loginResponse.dto'
import { GetAccessResponseDto } from '@DTO/getAccessResponse.dto'
import { AccessJwt } from '@decorators/accessJwt.decorator'
import { ResetPasswordBodyDto } from '@DTO/resetPasswordBody.dto'
import { ChangePasswordBodyDto } from '@DTO/changePasswordBody.dto'
import { RegistrationBodyDto } from '@DTO/registrationBody.dto'
import { EmailActive } from '@decorators/emailActive.decorator'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('registration')
	@ApiOkResponse({ type: RegistrationResponseDto })
	@ApiBody({ type: RegistrationBodyDto })
	async registration(@Body() user: User): Promise<Registration> {
		return this.authService.registration(user)
	}

	@Patch('login')
	@ApiOkResponse({ type: LoginResponseDto })
	@ApiBody({ type: LoginBodyDto })
	async login(
		@Body() emailPassword: Pick<User, 'password' | 'email'>
	): Promise<Login> {
		return this.authService.login(emailPassword.email, emailPassword.password)
	}

	@Patch('logout')
	@AccessJwt()
	@ApiBearerAuth()
	@ApiOkResponse({ type: UserDto })
	async logout(@CurrentUser() user: User): Promise<User> {
		return this.authService.removeCurrentRefreshToken(user.id)
	}

	@Patch('reset-password')
	@ApiOkResponse({ type: UserDto })
	@ApiBody({ type: ResetPasswordBodyDto })
	async resetPassword(@Body('email') email: string): Promise<User> {
		return this.authService.resetPassword(email)
	}

	@Patch('change-password')
	@EmailActive()
	@AccessJwt()
	@ApiBearerAuth()
	@ApiOkResponse({ type: UserDto })
	@ApiBody({ type: ChangePasswordBodyDto })
	async changePassword(
		@CurrentUser() user: User,
		@Body('oldPassword') oldPassword: string,
		@Body('newPassword') newPassword: string
	): Promise<User> {
		return this.authService.changePassword(user.id, oldPassword, newPassword)
	}

	@Get('get-access')
	@UseGuards(RefreshJwtGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: GetAccessResponseDto })
	@ApiBody({ description: 'Refresh token required' })
	async getAccessToken(
		@Headers('authorization') authorization: string
	): Promise<Pick<Login, 'accessToken'>> {
		const refreshToken = authorization.replace('Bearer ', '')
		return this.authService.getAccessTokenFromRefreshToken(refreshToken)
	}

	@Get('activate/:activateLink')
	async emailActivate(
		@Param('activateLink') activateLink: string,
		@Query('userId') userId: string
	): Promise<string> {
		return this.authService.emailActivate(activateLink, userId)
	}
}
