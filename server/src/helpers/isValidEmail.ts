const emailRegExp =
	/^[\w\._\+%]+@(live|hotmail|outlook|aol|yahoo|rocketmail|gmail|gmx\.com|mail.com|inbox.com|icloud|aim|yandex|zoho)\./

export const isValidEmail = (email: string): boolean => {
	const isFound = email.search(emailRegExp)
	if (isFound === -1) return false

	const domainZone = email.split('.').at(-1)
	return !(domainZone !== 'com' && domainZone !== 'ru')
}
