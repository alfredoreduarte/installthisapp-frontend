import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import * as actions from 'actions/apps'
const appsCreateResponse = require('data/apps.create')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Async Actions', () => {
	afterEach(() => {
		nock.cleanAll()
	})
	it('posts new data and returns server response', () => {
		nock('http://example.com/').get('/apps/create').reply(200, appsCreateResponse)
		const store = mockStore()
		return store.dispatch(actions.postNewApp())
			.then(() => {
				const normalized = normalize(appsCreateResponse, schema.app)
				const expectedActions = [
					{
						type: 'RECEIVE_ENTITIES',
						response: {
							entities: normalized.entities
						}
					}
				]
				const resultingActions = store.getActions()
				expect(resultingActions).toBeAn(Array)
				expect(resultingActions[0]).toBeAn(Object)
				expect(resultingActions[0].type).toEqual('RECEIVE_ENTITIES')
				expect(resultingActions[0].response).toBeAn(Object)
				expect(resultingActions[0].response.entities).toBeAn(Object)
			})
	})
})

describe('Actions', () => {
	describe('deleteApp', () => {
		it("should generate action for marking app as deleted", () => {
			const checksum = '9KW8J'
			const expectedAction = {
				type: 'DELETE_APP',
				checksum
			}
			expect(actions.deleteApp(checksum)).toEqual(expectedAction)
		})
	})
})