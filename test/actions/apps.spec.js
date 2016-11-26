import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import * as actions from 'actions/apps'
// const appsCreateResponse = require('data/apps.create')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Async Actions', () => {
	afterEach(() => {
		nock.cleanAll()
	})
	it('posts new data and returns server response')
})

describe('Actions', () => {
	describe('deleteApp', () => {
		it("should generate action for marking app as deleted")
	})
})