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
					type: 'SEARCH_TEXT',
					payload: expectedResult
				}
				expect(filterText({}, action)).toEqual(expectedResult)
			})
		})
	})
})