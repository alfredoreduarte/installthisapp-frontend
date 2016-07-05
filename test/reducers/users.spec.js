import expect from 'expect'
import users from '../../reducers/users'

describe('Reducers', () => {
	describe('users', () => {
		it('Should provide the initial state', () => {
			const initialState = {}
			expect(users(undefined, {})).toEqual(initialState)
		})
		describe('When receiving data', () => {
			it('should save the entities', () => {
				const expectedResult = {
					1342923825725048: {
						id: 1342923825725048,
						name: "Rodrigo Keen",
						createdOn: "2016-05-01T20:46:22.000-04:00",
					},
					1315096875183600: {
						id: 1315096875183600,
						name: "Mikhail Herrero",
						createdOn: "2016-02-01T20:46:22.000-04:00",
					}
				}
				const action = {
					type: null,
					entities: {
						users: expectedResult
					}
				}
				expect(users({}, action)).toEqual(expectedResult)
			})
		})
	})
})