import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useProtectedRoute = (redirectPath: string, access: boolean) => {
	const router = useRouter()

	useEffect(() => {
		if (access) return
		void router.push(redirectPath)
	})
}
