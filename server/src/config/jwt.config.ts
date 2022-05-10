import { ConfigService } from '@nestjs/config'

export const getJWTConfig = async (configService: ConfigService) => {
	return { secret: configService.get('JWT_ACCESS_SECRET') }
}
