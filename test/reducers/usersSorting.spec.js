import expect from 'expect'
import usersSorting from 'reducers/usersSorting'

describe('Reducers', () => {
	describe('usersSorting', () => {
		it('Should provide the initial state', () => {
			const initialState = 'name'
			expect(usersSorting(undefined, {})).toEqual(initialState)
		})
		it('Should toggle sorting key', () => {
			const expectedResult = 'createdOn'
			const action = {
				type: 'SORT_USERS',
				payload: expectedResult
			}
			expect(usersSorting({}, action)).toEqual(expectedResult)
		})
	})
})