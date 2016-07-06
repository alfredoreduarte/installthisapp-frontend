import expect from 'expect'
import pages from 'reducers/pages'

describe('Reducers', () => {
	describe('pages', () => {
		it('Should provide the initial state', () => {
			const initialState = {}
			expect(pages(undefined, {})).toEqual(initialState)
		})
	})
})