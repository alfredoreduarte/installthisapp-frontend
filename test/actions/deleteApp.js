import expect from 'expect'
import * as actions from 'actions/deleteApp'

describe('Actions', () => {
	describe('deleteApp', () => {
		it("should create an action to set the app to be deleted", () => {
			const checksum = '1234'
			const expectedAction = {
				type: 'SET_DELETE_APP',
				checksum
			}
			expect(actions.setAppToDelete(checksum)).toEqual(expectedAction)
		})
	})
})