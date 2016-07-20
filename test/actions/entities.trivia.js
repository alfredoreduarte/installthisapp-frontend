import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import * as actions from 'modules/trivia/actions/entities'
const entitiesResponse = require('data/entities.trivia')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Trivia Async Actions', () => {
	afterEach(() => {
		nock.cleanAll()
	})
	it('Gets Trivia data from API', () => {
		nock('http://example.com/').get('/entities.trivia').reply(200, entitiesResponse)
		const store = mockStore()
		return store.dispatch(actions.fetchTriviaEntities())
			.then(() => {
				const normalized = normalize(entitiesResponse, schema.entities)
				const expectedActions = [
					{
						type: 'TRIVIA/RECEIVE_ENTITIES',
						response: {
							entities: normalized.entities
						}
					}
				]
				const resultingActions = store.getActions()
				expect(resultingActions).toBeAn(Array)
				expect(resultingActions[0]).toBeAn(Object)
				expect(resultingActions[0].type).toEqual('TRIVIA/RECEIVE_ENTITIES')
				expect(resultingActions[0].response).toBeAn(Object)
				expect(resultingActions[0].response.entities).toBeAn(Object)
			})
	})
})