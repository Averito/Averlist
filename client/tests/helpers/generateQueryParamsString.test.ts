import { queryParamsString } from '../../src/helpers/queryParamsString'

const queryObjectTest1 = {
	pageSize: 15,
	limit: 2
}
const queryObjectTest2 = {
	name: 'someone'
}
const queryObjectTest3 = {
	ids: [56, 1, 2, 53]
}
const queryObjectTest4 = {
	filter: ['yuri', 'hentai']
}
const queryObjectTest5 = {}

describe('GenerateQueryParamsString function:', () => {
	test('should return queryParams string', () => {
		expect(queryParamsString(queryObjectTest1)).toBe('?pageSize=15&limit=2')
		expect(queryParamsString(queryObjectTest2)).toBe('?name=someone')
		expect(queryParamsString(queryObjectTest3)).toBe('?ids=56%2C1%2C2%2C53')
		expect(queryParamsString(queryObjectTest4)).toBe('?filter=yuri%2Chentai')
		expect(queryParamsString(queryObjectTest5)).toBe('')
	})
})
