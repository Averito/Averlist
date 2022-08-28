import { ConfigService } from '@nestjs/config'
import { MailerOptions } from '@nestjs-modules/mailer'

export const getNodemailerConfig = (
	configService: ConfigService
): MailerOptions => {
	return {
		transport: {
			host: configService.get('MAILER_HOST'),
			port: configService.get('MAILER_PORT'),
			secure: true,
			auth: {
				user: configService.get('MAILER_AUTH_USER'),
				pass: configService.get('MAILER_AUTH_PASS')
			}
		}
	}
}
