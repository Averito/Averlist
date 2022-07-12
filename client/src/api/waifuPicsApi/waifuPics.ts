import axios from 'axios'

export namespace WaifuPics {
	export type Numerality = 'many' | undefined
	export type Type = 'nsfw' | 'sfw'
	export type Category =
		| 'waifu'
		| 'neko'
		| 'blowjob'
		| 'megumin'
		| 'shinobu'
		| 'bully'
		| 'cuddle'
		| 'cry'
		| 'hug'
		| 'awoo'
		| 'kiss'
		| 'lick'
		| 'pat'
		| 'pat'
		| 'smug'
		| 'bonk'
		| 'yeet'
		| 'blush'
		| 'smile'
		| 'wave'
		| 'highfive'
		| 'handhold'
		| 'nom'
		| 'bite'
		| 'glomp'
		| 'slap'
		| 'kill'
		| 'kick'
		| 'happy'
		| 'wink'
		| 'poke'
		| 'dance'
		| 'cringe'
	export type ManyAnimeImages = { files: string[] }
}

export const SFWCategories: WaifuPics.Category[] = [
	'waifu',
	'neko',
	'megumin',
	'shinobu',
	'bully',
	'cuddle',
	'cry',
	'hug',
	'awoo',
	'kiss',
	'lick',
	'pat',
	'pat',
	'smug',
	'bonk',
	'yeet',
	'blush',
	'smile',
	'wave',
	'highfive',
	'handhold',
	'nom',
	'bite',
	'glomp',
	'slap',
	'kill',
	'kick',
	'happy',
	'wink',
	'poke',
	'dance',
	'cringe'
]

export const NSFWCategories: WaifuPics.Category[] = ['waifu', 'neko', 'blowjob']

const WAIFU_PICS_API_URI = process.env.NEXT_PUBLIC_WAIFU_PICS_API_URI

export const getAnimeImage = async (
	numerality: WaifuPics.Numerality,
	type: WaifuPics.Type,
	category: WaifuPics.Category
) => {
	if (numerality === 'many') {
		const response = await axios.post<WaifuPics.ManyAnimeImages>(
			`${WAIFU_PICS_API_URI}/${numerality}/${type}/${category}`,
			{}
		)
		return response.data.files
	}
	const response = await axios.get<string>(
		`${WAIFU_PICS_API_URI}/${type}/${category}`
	)
	return response.data
}
