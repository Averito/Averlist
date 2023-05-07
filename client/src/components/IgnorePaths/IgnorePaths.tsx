import { FC, PropsWithChildren } from 'react'
import { useRouter } from 'next/router'

import { IgnorePathsProps } from './IgnorePaths.types'

export const IgnorePaths: FC<PropsWithChildren<IgnorePathsProps>> = ({
	children,
	ignorePaths
}) => {
	const router = useRouter()

	const currentRouteIgnored = ignorePaths.includes(router.pathname)
	if (currentRouteIgnored) return <></>

	return <>{children}</>
}
