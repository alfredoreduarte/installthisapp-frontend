import expect from 'expect'
import pages from '../../reducers/pages'

describe('Reducers', () => {
	describe('pages', () => {
		it('Should provide the initial state', () => {
			const initialState = {}
			expect(pages(undefined, {})).toEqual(initialState)
		})
		describe('When receiving data', () => {
			it('should save the entities', () => {
				const expectedResult = {
					411: {
						id: 411,
						identifier: 123423423,
						name: "Testecito"
					},
					413: {
						id: 413,
						identifier: 123423423,
						name: "Alfred Tests"
					}
				}
				const action = {
					type: null,
					entities: {
						pages: expectedResult
					}
				}
				expect(pages({}, action)).toEqual(expectedResult)
			})
		})
	})
})