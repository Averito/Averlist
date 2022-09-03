import NextAuth, { NextAuthOptions } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'
import DiscordProvider from 'next-auth/providers/discord'
import GoogleProvider from 'next-auth/providers/google'
import { serialize } from 'cookie'

import { averlist } from '@averlistApi/averlist'
import { setCookie } from 'cookies-next'

const nextAuthOptions = (
	req: NextApiRequest,
	res: NextApiResponse
): NextAuthOptions => ({
	callbacks: {
		async signIn({ user, account }) {
			try {
				const registrationBody = {
					login: user.name || '',
					name: user.name || '',
					email: user.email || '',
					avatar: user.image ?? undefined,
					password: '',
					emailActive: true,
					accessToken: account.access_token
				}

				const {
					tokens: { accessToken, refreshToken }
				} = await averlist.auth.registration(registrationBody)

				res.setHeader('set-cookie', [
					serialize('accessToken', accessToken, {
						path: '/',
						httpOnly: true,
						sameSite: true
					}),
					serialize('refreshToken', refreshToken, {
						path: '/',
						httpOnly: true,
						sameSite: true
					})
				])
			} catch {
				const loginData = {
					email: user.email ?? '',
					accessToken: account.access_token
				}
				const { accessToken, refreshToken } = await averlist.auth.login(
					loginData
				)

				res.setHeader('set-cookie', [
					serialize('accessToken', accessToken, {
						path: '/',
						httpOnly: true,
						sameSite: true
					}),
					serialize('refreshToken', refreshToken, {
						path: '/',
						httpOnly: true,
						sameSite: true
					})
				])
			}

			return '/lk'
		}
	},
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		})
	]
})

const nextAuthInitialize = (req: NextApiRequest, res: NextApiResponse) => {
	return NextAuth(req, res, nextAuthOptions(req, res))
}

export default nextAuthInitialize
