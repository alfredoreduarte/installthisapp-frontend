import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import css from 'css'
import * as actions from 'actions/styles'


const cssString = "body {background: red;font-size: 18px;}"
const checksum = '1KO8H'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Async Actions', () => {
	afterEach(() => {
		nock.cleanAll()
	})
	it('Gets app stylesheet', () => {
		nock('http://example.com/').get('/apps/styles/' + checksum).reply(200, cssString)
		const store = mockStore()
		return store.dispatch(actions.fetchStyles(checksum))
			.then(() => {
				const cssObject = css.parse(cssString)
				const expectedActions = [
					{
						type: 'RECEIVE_STYLES',
						payload: cssObject
					}
				]
				const resultingActions = store.getActions()
				expect(resultingActions[0].type).toEqual('RECEIVE_STYLES')
				expect(resultingActions[0].payload).toBeAn(Object)
			})
	})
	it("should create an action to save the current css selector with dots included", () => {
		const selector = ['game-title', 'page-title']
		const expectedAction = {
			type: 'SET_STYLES_SELECTOR',
			payload: ['.game-title', '.page-title']
		}
		expect(actions.setCurrentSelector(selector)).toEqual(expectedAction)
	})
})