import expect from 'expect'
import selectedUserIds from 'reducers/selectedUserIds'

describe('Reducers', () => {
	describe('selectedUserIds', () => {
		const initialState = []
		it('Should provide the initial state', () => {
			expect(selectedUserIds(undefined, {})).toEqual(initialState)
		})
		describe('should handle SELECT_USER action', () => {
			it('when the ID was not selected, add it', () => {
				expect(selectedUserIds({}, { type: 'SELECT_USER', id: 1 })).toEqual([1])
			})
			it('when the ID was already selected, remove it', () => {
				const state = [1, 2, 3]

				expect(selectedUserIds(state, { type: 'SELECT_USER', id: 1 })).toEqual([2, 3])
			})
		})
	})
})