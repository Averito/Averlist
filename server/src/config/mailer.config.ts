import { ConfigService } from '@nestjs/config'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'

export const getMailerConfig = async (configService: ConfigService) => {
	const transport = configService.get<string>('MAILER_TRANSPORT')
	const mailFromName = configService.get<string>('MAILER_FROM_NAME')
	const mailFromAddress = configService.get<string>('MAILER_FROM_EMAIL')

	return {
		transport,
		defaults: {
			from: `"${mailFromName}" <${mailFromAddress}>`
		},
		template: {
			adapter: new EjsAdapter(),
			options: {
				strict: false
			}
		}
	}
}
