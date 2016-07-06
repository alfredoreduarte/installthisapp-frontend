import expect from 'expect'
import * as actions from 'actions/admin'

describe('Actions', () => {
	describe('admin', () => {
		it("should save admin data", () => {
			const expectedAction = {
				type: 'RECEIVE_ADMIN',
				payload: {}
			}
			expect(actions.receiveAdmin({})).toEqual(expectedAction)
		})
	})
})