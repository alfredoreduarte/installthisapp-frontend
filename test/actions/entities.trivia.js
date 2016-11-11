import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import * as actions from 'modules/trivia/actions/entities'
// const entitiesResponse = require('data/entities.trivia')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Trivia Async Actions', () => {
	afterEach(() => {
		nock.cleanAll()
	})
	it('Gets Trivia data from API')
})