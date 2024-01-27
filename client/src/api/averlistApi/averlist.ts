import oldAxios from 'axios'

import { users } from '@averlistApi/entities/users'
import { anime } from '@averlistApi/entities/anime'

export const axios = oldAxios.create({
	withCredentials: true,
	baseURL: process.env.NEXT_PUBLIC_AVERLIST_API_URI
})

export const averlist = {
	users,
	anime
}
