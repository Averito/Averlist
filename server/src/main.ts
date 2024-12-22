import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import { AppModule } from './app.module'
import * as packageJSON from '../package.json'
import 'colors'

const PORT = process.env.PORT || 3000
const MODE = process.env.MODE
const COOKIE_SECRET = process.env.COOKIE_SECRET || ''
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

	app.use(
		session({
			name: 'averlist-session',
			secret: COOKIE_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 1000 * 60 * 60 * 24
			}
		})
	)
	app.use(passport.initialize())
	app.use(passport.session())

	app.enableCors({
		origin: development ? 'http://localhost:3000' : 'https://averlist.averitora.ru',
		credentials: true
	})

	app.use(cookieParser())

	await app.listen(PORT)
	console.log(`Server is running on http://localhost:${PORT}`.cyan.bold)
}

void bootstrap()
