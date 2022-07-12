import dynamic from 'next/dynamic'

const NotFound = dynamic(() => import('@pages/NotFound'), { ssr: false })

export default NotFound
