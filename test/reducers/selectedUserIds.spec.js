import expect from 'expect'
import selectedItems from 'reducers/selectedItems'

describe('Reducers', () => {
	describe('selectedItems', () => {
		const initialState = []
		it('Should provide the initial state', () => {
			expect(selectedItems(undefined, {})).toEqual(initialState)
		})
		describe('should handle SELECT_ITEM action', () => {
			it('when the ID was not selected, add it', () => {
				expect(selectedItems({}, { type: 'SELECT_ITEM', id: 1 })).toEqual([1])
			})
			it('when the ID was already selected, remove it', () => {
				const state = [1, 2, 3]

				expect(selectedItems(state, { type: 'SELECT_ITEM', id: 1 })).toEqual([2, 3])
			})
		})
	})
})
