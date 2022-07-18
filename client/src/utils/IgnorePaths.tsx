import { FC, PropsWithChildren } from 'react'
import { useRouter } from 'next/router'

interface IgnorePathsProps {
	ignorePaths: string[]
}

export const IgnorePaths: FC<PropsWithChildren<IgnorePathsProps>> = ({
	children,
	ignorePaths
}) => {
	const router = useRouter()

	const currentRouteIgnored = ignorePaths.includes(router.pathname)
	if (currentRouteIgnored) return <></>

	return <>{children}</>
}
