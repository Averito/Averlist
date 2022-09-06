import NextAuth, { NextAuthOptions } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'
import DiscordProvider from 'next-auth/providers/discord'
import VKProvider from 'next-auth/providers/vk'
import { serialize } from 'cookie'

import { averlist } from '@averlistApi/averlist'

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
					email: (user.email || (account.email as string)) ?? '',
					avatar: user.image ?? undefined,
					password: '',
					emailActive: true,
					accessToken: account.access_token,
					vkId:
						account.provider === 'vk' ? +account.providerAccountId : undefined,
					discordId:
						account.provider === 'discord'
							? +account.providerAccountId
							: undefined
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

				return '/lk?reload=true'
			} catch {
				try {
					const loginData = {
						email: (user.email || (account.email as string)) ?? '',
						vkId:
							account.provider === 'vk'
								? +account.providerAccountId
								: undefined,
						discordId:
							account.provider === 'discord'
								? +account.providerAccountId
								: undefined
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
				} catch {
					return true
				}

				return '/lk?reload=true'
			}
		}
	},
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string
		}),
		VKProvider({
			clientId: process.env.VK_CLIENT_ID as string,
			clientSecret: process.env.VK_CLIENT_SECRET as string
		})
	]
})

const nextAuthInitialize = (req: NextApiRequest, res: NextApiResponse) => {
	return NextAuth(req, res, nextAuthOptions(req, res))
}

export default nextAuthInitialize
