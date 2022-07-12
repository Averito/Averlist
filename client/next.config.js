/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')

module.exports = withPWA({
	pwa: {
		dest: 'public'
	},
	images: {
		domains: ['dl-20211030-963.anilib.top', 'i.waifu.pics']
	}
})
