import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import * as actions from 'actions/apps'
const appsCreateResponse = require('data/apps.create')

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Async Actions', () => {
	afterEach(() => {
		nock.cleanAll()
	})
	it('posts new data and returns server response', () => {
		nock('http://example.com/')
			.get('/apps/create')
			.reply(200, appsCreateResponse)
		const store = mockStore({ todos: [] })
		return store.dispatch(actions.postNewApp())
			.then(() => {
				const expectedActions = [
					{
						type: 'RECEIVE_SINGLE_APP',
						id: 23132,
					}
				]
				expect(store.getActions()).toEqual(expectedActions)
			})
	})
})