/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode: false,
	env: {
		GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY
	},
	images: {
		domains: [
			'dl-20211030-963.anilib.top',
			'averlist.averitora.ru',
			'cdn.discordapp.com',
			'sun2-4.userapi.com',
			'sun2-11.userapi.com',
			'localhost',
			'192.168.1.55'
		]
	}
}
