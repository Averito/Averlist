import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import VKProvider from 'next-auth/providers/vk'

export default NextAuth({
	callbacks: {
		async signIn({ user, account }) {
			const email = user.email || (account.email as string)
			return encodeURI(
				`/set-password?email=${email}&name=${user.name}&avatar=${user.image}`
			)
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
