/*
 * @description Принимает время в секундах и возвращает время в формате mm:ss
 *
 * @param {number} timeInSeconds
 *
 * @return {string}
 * */
export const getTimeFromSeconds = (timeInSeconds: number): string => {
	const minutes = Math.floor(Math.floor(timeInSeconds) / 60) % 60
	const seconds = Math.floor(Math.floor(timeInSeconds) % 60)
	const hours = Math.floor(Math.floor(Math.floor(timeInSeconds) / 60) / 60)

	const hoursStr = hours < 10 ? `0${hours}:` : `${hours.toString()}:`
	const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString()
	const secondsStr = seconds < 10 ? `0${seconds}` : seconds.toString()

	return `${hours > 0 ? hoursStr : ''}${minutesStr}:${secondsStr}`
}
