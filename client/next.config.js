/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')

module.exports = withPWA({
	reactStrictMode: false,
	pwa: {
		dest: 'public'
	},
	env: {
		GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY
	},
	images: {
		domains: [
			'dl-20211030-963.anilib.top',
			'averlist.xyz',
			'cdn.discordapp.com',
			'sun2-4.userapi.com',
			'sun2-11.userapi.com',
			'localhost',
			'192.168.1.55'
		]
	}
})
