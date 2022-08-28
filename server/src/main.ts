import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as packageJSON from '../package.json'
import 'colors'

const PORT = process.env.PORT || 3000
const MODE = process.env.MODE

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	if (MODE === 'development') {
		const config = new DocumentBuilder()
			.setTitle(packageJSON.name)
			.setDescription(packageJSON.description)
			.setVersion(packageJSON.version)
			.addSecurity('bearer', {
				type: 'http',
				scheme: 'bearer'
			})
			.build()
		const document = SwaggerModule.createDocument(app, config)
		SwaggerModule.setup('api', app, document)
	}

	if (MODE === 'production') {
		app.setGlobalPrefix('api')
	}

	await app.listen(PORT)
	console.log(`Server is running on http://localhost:${PORT}`.cyan.bold)
}

bootstrap()
