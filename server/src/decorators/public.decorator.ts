import { SetMetadata } from '@nestjs/common'

export const PUBLIC_KEY = 'route'
export const Public = () => SetMetadata(PUBLIC_KEY, true)
