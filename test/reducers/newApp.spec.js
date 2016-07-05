import expect from 'expect'
import newApp from 'reducers/newApp'

describe('Reducers', () => {
	describe('newApp', () => {
		it('Should provide the initial state', () => {
			const initialState = {
				module: null,
				pageId: null,
				title: null,
			}
			expect(newApp(undefined, {})).toEqual(initialState)
		})
		it('Should set module type', () => {
			const expectedResult = {
				module: 'trivia',
				pageId: null,
				title: null
			}
			const action = {
				type: 'NEW_APP/SET_MODULE',
				payload: {
					module: 'trivia'
				}
			}
			expect(newApp(undefined, action)).toEqual(expectedResult)
		})
		it('Should set page ID', () => {
			const expectedResult = {
				module: null,
				pageId: 23847923847,
				title: null
			}
			const action = {
				type: 'NEW_APP/SET_PAGE',
				payload: {
					pageId: 23847923847
				}
			}
			expect(newApp(undefined, action)).toEqual(expectedResult)
		})
		it('Should set app title', () => {
			const expectedResult = {
				module: null,
				pageId: null,
				title: 'Título de la app'
			}
			const action = {
				type: 'NEW_APP/SET_TITLE',
				payload: {
					title: 'Título de la app'
				}
			}
			expect(newApp(undefined, action)).toEqual(expectedResult)
		})
	})
})