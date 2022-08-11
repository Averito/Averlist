import { uniqueIds } from '../../src/helpers/uniqueIds'

const arrayForTest1 = [
	{
		id: 1
	},
	{
		id: 1
	},
	{
		id: 1
	},
	{
		id: 2
	}
]
const resultArray1 = [{ id: 1 }, { id: 2 }]

describe('uniqueIds function:', () => {
	test('Should return a new array with unique id\'s for objects', () => {
		expect(uniqueIds(arrayForTest1)).toEqual(resultArray1)
	})
})
