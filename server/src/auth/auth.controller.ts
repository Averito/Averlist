import { Body, Controller, Get, Headers, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
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
	async registration(
		@Body() user: RegistrationBodyDto,
		@Res({ passthrough: true }) response: Response
	): Promise<Registration> {
		const registrationResult = await this.authService.registration(user)

		response.cookie('accessToken', registrationResult.tokens.accessToken)
		response.cookie('refreshToken', registrationResult.tokens.refreshToken)

		return registrationResult
	}

	@Patch('login')
	@ApiOkResponse({ type: LoginResponseDto })
	@ApiBody({ type: LoginBodyDto })
	async login(
		@Body() loginBody: LoginBodyDto,
		@Res({ passthrough: true }) response: Response
	): Promise<Login> {
		const loginResult = await this.authService.login(loginBody)

		response.cookie('accessToken', loginResult.accessToken)
		response.cookie('refreshToken', loginResult.refreshToken)

		return loginResult
	}

	@Patch('logout')
	@AccessJwt()
	@ApiBearerAuth()
	@ApiOkResponse({ type: UserDto })
	async logout(
		@CurrentUser() user: User,
		@Res({ passthrough: true }) response: Response
	): Promise<User> {
		response.cookie('accessToken', '')
		response.cookie('refreshToken', '')

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
		@Headers('authorization') authorization: string,
		@Res({ passthrough: true }) response: Response
	): Promise<Pick<Login, 'accessToken'>> {
		const refreshToken = authorization.replace('Bearer ', '')
		const objWithAccessToken =
			await this.authService.getAccessTokenFromRefreshToken(refreshToken)

		response.cookie('accessToken', objWithAccessToken.accessToken)

		return objWithAccessToken
	}

	@Get('activate/:activateLink')
	async emailActivate(
		@Param('activateLink') activateLink: string,
		@Query('userId') userId: string
	): Promise<string> {
		return this.authService.emailActivate(activateLink, userId)
	}
}
