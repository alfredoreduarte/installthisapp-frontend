import expect from 'expect'
import apps from 'reducers/apps'

describe('Reducers', () => {
	describe('apps', () => {
		it('Should provide the initial state', () => {
			const initialState = {}
			expect(apps(undefined, {})).toEqual(initialState)
		})
		describe('When receiving data', () => {
			it('should save the entities', () => {
				const expectedResult = {
					231312: {
						id: 231312,
						checksum: "X91H7",
						title: "Trivia dos",
						type: "trivia",
						active: true,
						scheduled: false,
						page: 411,
						summary: [],
						users: [10208910337057839, 1097180737021047]
					}
				}
				const action = {
					type: null,
					entities: {
						apps: expectedResult
					}
				}
				expect(apps({}, action)).toEqual(expectedResult)
			})
		})
	})
})