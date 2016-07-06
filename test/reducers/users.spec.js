import expect from 'expect'
import users from 'reducers/users'

describe('Reducers', () => {
	describe('users', () => {
		it('Should provide the initial state', () => {
			const initialState = {}
			expect(users(undefined, {})).toEqual(initialState)
		})
	})
})