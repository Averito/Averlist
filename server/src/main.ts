import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import * as packageJSON from '../package.json'
import 'colors'

const PORT = process.env.PORT || 3000
const MODE = process.env.MODE
const development = MODE === 'development'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	if (development) {
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

	if (!development) {
		app.setGlobalPrefix('api/v1')
	}

	if (development) {
		app.enableCors({
			origin: 'http://localhost:3000',
			credentials: true
		})
	} else {
		app.enableCors({
			origin: 'https://averlist.xyz',
			credentials: true
		})
	}

	app.use(cookieParser())

	await app.listen(PORT)
	console.log(`Server is running on http://localhost:${PORT}`.cyan.bold)
}

bootstrap()
