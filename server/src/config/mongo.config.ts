import { ConfigService } from '@nestjs/config'

export const getMongoDbConfig = async (configService: ConfigService) => {
	return {
		uri:
			configService.get('NODE_ENV') === 'development'
				? getMongoString(configService)
				: getMongoStringProd(configService),
		...getMongoOptions()
	}
}

const getMongoStringProd = (configService: ConfigService) => {
	return `mongodb+srv://${configService.get('MONGO_LOGIN')}:${configService.get(
		'MONGO_PASSWORD'
	)}@cluster0.kodga.mongodb.net/${configService.get(
		'MONGO_DATABASE'
	)}?retryWrites=true&w=majority`
}
const getMongoString = (configService: ConfigService) => {
	return `mongodb://${configService.get('MONGO_HOST')}:${configService.get(
		'MONGO_PORT'
	)}/${configService.get('MONGO_DATABASE')}`
}
const getMongoOptions = () => ({
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})
