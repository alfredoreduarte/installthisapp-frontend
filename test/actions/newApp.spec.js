import expect from 'expect'
import * as actions from 'actions/newApp'

describe('Actions', () => {
	describe('newApp', () => {
		it("should create an action to save the new app's module", () => {
			const module = 'trivia'
			const expectedAction = {
				type: 'NEW_APP/SET_MODULE',
				payload: {
					module
				}
			}
			expect(actions.setNewAppModule(module)).toEqual(expectedAction)
		})
		it("should create an action to assign the new app's page ID", () => {
			const pageId = 234234234
			const expectedAction = {
				type: 'NEW_APP/SET_PAGE',
				payload: {
					pageId
				}
			}
			expect(actions.setNewAppPage(pageId)).toEqual(expectedAction)
		})
		it("should create an action to assign the new app's title", () => {
			const title = 'Título de la app'
			const expectedAction = {
				type: 'NEW_APP/SET_TITLE',
				payload: {
					title
				}
			}
			expect(actions.setNewAppTitle(title)).toEqual(expectedAction)
		})
	})
})