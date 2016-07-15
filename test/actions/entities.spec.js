import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import * as actions from 'actions/entities'
const entitiesResponse = require('data/entities')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Async Actions', () => {
	afterEach(() => {
		nock.cleanAll()
	})
	it('Gets entities from API', () => {
		nock('http://example.com/').get('/admindata').reply(200, entitiesResponse)
		const store = mockStore()
		return store.dispatch(actions.fetchEntities())
			.then(() => {
				const normalized = normalize(entitiesResponse, schema.entities)
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