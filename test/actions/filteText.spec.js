import expect from 'expect'
import * as actions from 'actions/filterText'

describe('Actions', () => {
	describe('filterText', () => {
		it("should clear out the filter keyword", () => {
			const expectedAction = {
				type: 'CLEAR_FILTERTEXT'
			}
			expect(actions.resetSearchText()).toEqual(expectedAction)
		})
		
	})
	describe('searchText', () => {
		it("should update the filter keyword", () => {
			const expectedAction = {
				type: 'UPDATE_FILTERTEXT',
				payload: 'hola'
			}
			expect(actions.searchText('hola')).toEqual(expectedAction)
		})
	})
})