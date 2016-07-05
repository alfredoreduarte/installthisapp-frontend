import expect from 'expect'
import admin from 'reducers/admin'

describe('Reducers', () => {
	describe('admin', () => {
		it('Should provide the initial state', () => {
			const initialState = {}
			expect(admin(undefined, {})).toEqual(initialState)
		})
		describe('When receiving data', () => {
			it('should save admin data', () => {
				const expectedResult = {
					id: 123,
					name: 'Alfredo Re',
					firstName: 'Alfredo',
					lastName: 'Re',
					email: 'alfredoreduarte@gmail.com'
				}
				const action = {
					type: 'RECEIVE_ADMIN',
					payload: expectedResult
				}
				expect(admin({}, action)).toEqual(expectedResult)
			})
		})
	})
})