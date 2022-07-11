import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req,
	Res,
	UploadedFile,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import { diskStorage } from 'multer'
import { ApiQuery, ApiTags } from '@nestjs/swagger'

import { UserService } from './user.service'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { imageFileFilter } from '../helpers/imageFileFilter'
import { editFileName } from '../helpers/editFileName'

@ApiTags('User')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiQuery({ name: 'GetAllUsers' })
	@Get()
	@UseGuards(JwtAuthGuard)
	getAllUsers() {
		return this.userService.getAllUsers()
	}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	getMe(@Req() request) {
		return this.userService.getMe(request.user.id)
	}

	@ApiQuery({ name: 'getAvatar' })
	@Get('me/avatar/:avatarId')
	serveAvatar(@Param('avatarId') avatarId, @Res() res) {
		res.sendFile(avatarId, { root: 'uploads/avatars' })
	}

	@Patch('me')
	@UseGuards(JwtAuthGuard)
	editDescription(
		@Body('description') description: string,
		@Body('login') login: string,
		@Req() request
	) {
		return this.userService.editDescriptionAndLogin(
			description,
			login,
			request.user.id
		)
	}

	@Post('me/avatar')
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(
		FileInterceptor('avatar', {
			storage: diskStorage({
				destination: './uploads/avatars',
				filename: editFileName
			}),
			fileFilter: imageFileFilter
		})
	)
	editAvatar(@UploadedFile() avatar: Express.Multer.File, @Req() request) {
		return this.userService.uploadAvatar(avatar, request.user.id)
	}

	@Delete('me/avatar')
	@UseGuards(JwtAuthGuard)
	removeAvatar(@Req() req) {
		return this.userService.removeAvatar(req.user.id)
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe({ transform: true }))
	getUserbyId(@Param() param) {
		return this.userService.getUserById(param.id)
	}

	@Delete('me/friends/:friendId')
	@UseGuards(JwtAuthGuard)
	removeFriend(@Param('friendId') friendId, @Req() req) {
		return this.userService.removeFriend(req.user.id, friendId)
	}
}
