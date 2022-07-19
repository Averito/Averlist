import { reverseArray } from '../../src/helpers/reverseArray'

const arrayForTest = [0, 1, 2, 3, 4]
const resultArray = [4, 3, 2, 1, 0]

const arrayForTest2 = [{ id: 1 }, 1, 'asda', [{ id: 2 }], 5_000_000]
const resultArray2 = [5_000_000, [{ id: 2 }], 'asda', 1, { id: 1 }]

describe('reverseArray function:', () => {
	test('shout return NEW reverse array', () => {
		expect(reverseArray(arrayForTest)).toEqual(resultArray)
	})

	test('shout return NEW reverse array (complex array)', () => {
		expect(reverseArray(arrayForTest2)).toEqual(resultArray2)
	})
})
