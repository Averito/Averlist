import { at } from '../../src/helpers/at'

const arrayForTest = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

describe('At function:', () => {
	test('must return an array element with support for a negative index', () => {
		expect(at(arrayForTest, -1)).toBe(10)
		expect(at(arrayForTest, -2)).toBe(9)
		expect(at(arrayForTest, -5)).toBe(6)
	})

	test('must return an array element', () => {
		expect(at(arrayForTest, 0)).toBe(0)
		expect(at(arrayForTest, 4)).toBe(4)
		expect(at(arrayForTest, 6)).toBe(6)
		expect(at(arrayForTest, 10)).toBe(10)
	})
})
