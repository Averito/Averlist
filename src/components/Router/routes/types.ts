import React from 'react'

type TypeRoute =
	| 'login'
	| 'registration'
	| 'another'
	| 'rememberPassword'
	| 'children'

interface Route {
	name: string
	key: string
	type: TypeRoute
	route: string
	component: React.FC
	children?: Route
}

export type Routes = Route[]
