import { Profile as DiscordProfile } from 'passport-discord'
import { Profile as VkProfile } from 'passport-vkontakte'
import { Profile as GoogleProfile } from 'passport-google-oauth20'
import { Profile as YandexProfile } from 'passport-yandex'

export interface StandardProfile {
	id: string
	avatar: string
	name: string
	email: string
}

export const discordProfileToProfile = ({
	id,
	avatar,
	username,
	email
}: DiscordProfile): StandardProfile => {
	return {
		id,
		avatar,
		name: username,
		email
	}
}

export const vkProfileToProfile = ({
	id,
	photos,
	displayName,
	emails
}: VkProfile): StandardProfile => {
	return {
		id,
		avatar: photos[photos.length - 1].value,
		name: displayName,
		email: emails[emails.length - 1].value
	}
}

export const googleProfileToProfile = ({
	id,
	photos,
	displayName,
	emails
}: GoogleProfile): StandardProfile => {
	return {
		id,
		avatar: photos[photos.length - 1].value,
		name: displayName,
		email: emails[emails.length - 1].value
	}
}

export const yandexProfileToProfile = ({
	id,
	displayName,
	emails,
	photos
}: YandexProfile): StandardProfile => {
	return {
		id,
		avatar: photos[photos.length - 1].value,
		name: displayName,
		email: emails[emails.length - 1].value
	}
}
