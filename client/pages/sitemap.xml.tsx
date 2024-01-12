import { GetServerSideProps } from 'next'
import * as process from 'process'
import { getAnilibriaUpdates, Title } from 'anilibria-api-wrapper'

function generateSiteMap(titles: Title[]) {
	let siteMap = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

	const urls = [
		{ url: `${process.env.NEXTAUTH_URL}/`, priority: 1 },
		{ url: `${process.env.NEXTAUTH_URL}/anime`, priority: 0.9 }
	]

	titles.forEach(title => {
		urls.push({
			url: `${process.env.NEXTAUTH_URL}/anime/${title.code}`,
			priority: 0.8
		})
	})

	urls.forEach(url => {
		siteMap += `
     <url>
       <loc>${url.url}</loc>
       <priority>${url.priority}</priority>
     </url>`
	})

	siteMap += `</urlset>`

	return siteMap
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const titles = await getAnilibriaUpdates({ filter: ['code'], limit: -1 })

	const sitemap = generateSiteMap(titles.data)

	res.setHeader('Content-Type', 'text/xml')
	res.write(sitemap)
	res.end()

	return {
		props: {}
	}
}

export default () => {}
