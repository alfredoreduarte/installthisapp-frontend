import expect from 'expect'
import deleteApp from 'reducers/deleteApp'

describe('Reducers', () => {
	describe('deleteApp', () => {
		it('Should provide the initial state', () => {
			const initialState = {
				checksum: null,
			}
			expect(deleteApp(undefined, {})).toEqual(initialState)
		})
		it('Should set app to be deleted', () => {
			const expectedResult = {
				checksum: '1234',
			}
			const action = {
				type: 'SET_DELETE_APP',
				checksum: '1234',
			}
			expect(deleteApp(undefined, action)).toEqual(expectedResult)
		})
	})
})
