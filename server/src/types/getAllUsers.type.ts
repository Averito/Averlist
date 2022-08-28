import { User } from '@prisma/client'

export type GetAllUsersType = Pick<User, 'id' | 'name' | 'avatar'>
