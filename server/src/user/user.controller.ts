import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Query,
	Res,
	UploadedFile
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator'
import { User } from '@prisma/client'
import { Response } from 'express'
import { UserService } from './user.service'
import { Roles } from '@decorators/role.decorator'
import { Role } from '@enums/role.enum'
import { CurrentUser } from '@decorators/user.decorator'
import { GetAllUsersType } from '../types/getAllUsers.type'
import { UserDto } from '@DTO/user.dto'
import { GetAllUsersResponseDto } from '@DTO/getAllUsersResponse.dto'
import { RemoveUserBodyDto } from '@DTO/removeUserBody.dto'
import { EditUserNameBodyDto } from '@DTO/editUserNameBody.dto'
import { ImageFile } from '@decorators/imageFile.decorator'
import { ApiFile } from '@decorators/apiFile.decorator'
import { Public } from '@decorators/public.decorator'
import { AccessJwt } from '@decorators/accessJwt.decorator'
import { EmailActive } from '@decorators/emailActive.decorator'

@Controller('users')
@AccessJwt()
@ApiBearerAuth()
@ApiTags('Users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@Roles(Role.ADMIN)
	@ApiOkResponse({ type: [UserDto], description: 'get all users for admin' })
	async getUsers(): Promise<User[]> {
		return this.userService.getAllForAdmin()
	}

	@Get('all')
	@EmailActive()
	@ApiOkResponse({
		type: [GetAllUsersResponseDto],
		description: 'get all users'
	})
	async getAllUsers(
		@Query('limit') limit?: string,
		@Query('page') page?: string
	): Promise<GetAllUsersType[]> {
		return this.userService.getAll(+(limit ?? 15), +(page ?? 1))
	}

	@Get('me')
	@ApiOkResponse({ type: UserDto })
	async getMe(@CurrentUser() user: User): Promise<User> {
		return this.userService.getMe(user.id)
	}

	@Get('avatars/:avatarName')
	@Public()
	async getAvatar(
		@Param('avatarName') avatarName: string,
		@Res() res: Response
	): Promise<void> {
		return res.sendFile(avatarName, { root: './uploads/avatars' })
	}

	@Patch('me/edit-name')
	@ApiOkResponse({ type: UserDto })
	@ApiBody({ type: EditUserNameBodyDto })
	async editName(
		@CurrentUser() user: User,
		@Body('name') name: string
	): Promise<User> {
		return this.userService.editName(user.id, name)
	}

	@Patch('me/avatar')
	@ImageFile('avatar', './uploads/avatars')
	@ApiOkResponse({ type: UserDto })
	@ApiFile('avatar')
	@ApiImplicitFile({ name: 'avatar' })
	async setAvatar(
		@UploadedFile() avatar: Express.Multer.File,
		@CurrentUser() user: User
	): Promise<User> {
		return this.userService.setAvatar(avatar, user.id)
	}

	@Delete('remove-friend/:friendId')
	@ApiOkResponse({ type: UserDto })
	async removeFriend(
		@Param('friendId') friendId: string,
		@CurrentUser() user: User
	): Promise<User> {
		return this.userService.removeFriend(friendId, user.id)
	}

	@Delete(':userId')
	@Roles(Role.ADMIN)
	@ApiOkResponse({ type: UserDto })
	@ApiBody({ type: RemoveUserBodyDto })
	async removeUser(@Param('userId') userId: string): Promise<User> {
		return this.userService.removeUserById(userId)
	}
}
