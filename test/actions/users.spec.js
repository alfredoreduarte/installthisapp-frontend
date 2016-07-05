import expect from 'expect'
import * as actions from 'actions/users'

describe('Actions', () => {
	describe('users', () => {
		it("should create an action to sort users", () => {
			const key = 'updatedOn'
			const expectedAction = {
				type: 'SORT_USERS',
				payload: key
			}
			expect(actions.sortUsersBy(key)).toEqual(expectedAction)
		})
		it("should create an action to add user to the selected group", () => {
			const id = 5
			const expectedAction = {
				type: 'SELECT_USER',
				id
			}
			expect(actions.selectUser(id)).toEqual(expectedAction)
		})
	})
})