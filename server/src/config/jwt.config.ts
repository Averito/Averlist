import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export const getJwtConfig = async (
	configService: ConfigService
): Promise<JwtModuleOptions> => {
	return {
		secret: configService.get('ACCESS_JWT_SECRET'),
		signOptions: {
			expiresIn: configService.get('ACCESS_EXP_JWT')
		}
	}
}
