import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import * as actions from 'actions/entities'
// const entitiesResponse = require('data/entities')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Async Actions', () => {
	afterEach(() => {
		nock.cleanAll()
	})
	it('Gets entities from API')
})
