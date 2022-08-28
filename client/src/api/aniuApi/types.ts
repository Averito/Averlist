export namespace Aniu {
	export interface Anime {
		id: string
		aniu_raiting: string | null
		aniu_raiting_count: string | null
		anixart: string | null
		kinopoisk: string | null
		kinopoisk_rating: string | null
		kodik_id: string
		anilibria_id: string | null
		shikimori: string
		shikimori_rating: string
		imdb: null | string
		imdb_rating: null | string
		myanimelist: string
		mydoramalint: null | string
		sovetromantica: null | string
		poster: string
		year: string
		genres: string
		country: string
		director: string
		author: null | string
		operator: null | string
		composer: string | null
		painter: string | null
		mounting: null | string
		scenario: string | null
		translators: null | string
		studio: string
		description: string
		note: null | string
		category: null | string
		status: string
		ageRating: null | string
		rating: string
		title_original: string
		title_ru: string
		title_alt: string
		title_jap: string
		franchise: string
		episodes_released: string
		episodes_total: string
		season: string
		release_date: null | string
		aired_date: string
		creation_date: null | string
		last_update_date: string
		group: null | string
		sub: string
		'3d': string
		kind: string
		duration: string
		chibi: string
		'4k': string
		isBanned: null | string
		last_season: string
		kodik_title: string
		kodik_other_title: string
		link: string
		material_data: string
	}

	export interface AnimeLinks {
		links: Anime[]
	}

	export interface Rating {
		value: number
		count: number
		text: string
	}

	export interface User {
		id: string
		login: string
		link: string
		gender: string
		avatar: string
		status: string
		is_banned: string
		ban_reason: null | string
		user_group_id: string
		team: boolean
	}

	export interface Comment {
		user: Aniu.User
		id: string
		message: string
		timestamp: string
		likes_count: number
		reply_count: number
		is_spoiler: string
		is_edited: string
		im_vote: boolean
		is_me: boolean
		reply: boolean
	}
}
