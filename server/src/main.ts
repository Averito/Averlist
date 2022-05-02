import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import 'colors'

const PORT = process.env.PORT || 5000

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true })
	const config = new DocumentBuilder().build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('/', app, document)
	await app.listen(PORT)
	console.log(
		`Server is running in ${process.env.NODE_ENV} mode on ${PORT} port.`.cyan
			.bold
	)
}

bootstrap()
