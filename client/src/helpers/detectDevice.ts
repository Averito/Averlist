export interface DetectDeviceReturn {
	isMobile: boolean
	isDesktop: boolean
	isIos: boolean
	isAndroid: boolean
	isOpera: boolean
	isWindows: boolean
	isSSR: boolean
}

/*
 * @description Определяет тип устройства на основе user-agent
 *
 * @param {GetServerSidePropsContext | GetStaticPropsContext} context
 *
 * @return {DetectDeviceReturn} detectDeviceObject
 * */
export const detectDevice = (userAgent: string): DetectDeviceReturn => {
	const isAndroid = !!userAgent.match(/Android/i)
	const isIos = !!userAgent.match(/iPhone|iPad|iPod/i)
	const isOpera = !!userAgent.match(/Opera Mini/i)
	const isWindows = !!userAgent.match(/IEMobile/i)
	const isSSR = !!userAgent.match(/SSR/i)
	const isMobile = isAndroid || isIos || isOpera || isWindows
	const isDesktop = !isMobile && !isSSR

	return {
		isAndroid,
		isIos,
		isOpera,
		isWindows,
		isSSR,
		isMobile,
		isDesktop
	}
}
