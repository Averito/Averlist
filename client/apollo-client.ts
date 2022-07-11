import { createHttpLink, InMemoryCache, ApolloClient } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const MY_GQLAPP_URI = process.env.MY_GQLAPP_URI

const httpLink = createHttpLink({
	uri: MY_GQLAPP_URI
})

const authLink = setContext((_, { headers }) => {
	let token: string = ''
	if (typeof window !== 'undefined') {
		const tokensStr = localStorage.getItem('tokens') as string
		token = tokensStr ? JSON.parse(tokensStr).accessToken : ''
	}

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	}
})

const initApolloClient = () => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: authLink.concat(httpLink),
		connectToDevTools: true
	})
}

export default initApolloClient()
