import expect from 'expect'
import appsSorting from 'reducers/appsSorting'

describe('Reducers', () => {
	describe('appsSorting', () => {
		it('Should provide the initial state', () => {
			const initialState = 'updatedOn'
			expect(appsSorting(undefined, {})).toEqual(initialState)
		})
		it('Should toggle sorting key', () => {
			const expectedResult = 'title'
			const action = {
				type: 'SORT_APPS',
				payload: expectedResult
			}
			expect(appsSorting({}, action)).toEqual(expectedResult)
		})
	})
})