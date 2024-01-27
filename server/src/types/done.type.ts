import { User } from '@prisma/client'

export type Done = (err: Error, user: User) => void
