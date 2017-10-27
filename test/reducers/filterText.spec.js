import expect from 'expect'
import filterText from 'reducers/filterText'

describe('Reducers', () => {
	describe('filterText', () => {
		it('Should provide the initial state', () => {
			const initialState = ''
			expect(filterText(undefined, {})).toEqual(initialState)
		})
		describe('When receiving search text', () => {
			it('should save search string', () => {
				const expectedResult = 'keyword'
				const action = {
					type: 'UPDATE_FILTERTEXT',
					payload: expectedResult,
				}
				expect(filterText({}, action)).toEqual(expectedResult)
			})
		})
		describe('When route state changes', () => {
			it('should reset the search string', () => {
				const expectedResult = ''
				const action = {
					type: '@@router/LOCATION_CHANGE',
				}
				expect(filterText({}, action)).toEqual(expectedResult)
			})
		})
	})
})
