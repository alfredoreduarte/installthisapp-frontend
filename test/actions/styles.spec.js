import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import css from 'css'
import * as actions from 'actions/styles'

const cssString = 'body {background: red;font-size: 18px;}'
const checksum = '1KO8H'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Async Styles Actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it('Gets app stylesheet')
  it('Should receive an event and dispatch actions to update MouseTrap coordinates and set the current selector')
})
describe('Styles actions', () => {
  it("should create an action to save the hovered element's css selector with dots included", () => {
    const selector = ['game-title', 'page-title']
    const expectedAction = {
      type: 'SET_HOVERED_SELECTOR',
      payload: ['.game-title', '.page-title'],
    }
    expect(actions.setHoveredSelector(selector)).toEqual(expectedAction)
  })
  it('should create an action to save the css selectors for the element being edited, with dots included', () => {
    const expectedAction = {
      type: 'SET_ACTIVE_SELECTOR',
    }
    expect(actions.setActiveSelector()).toEqual(expectedAction)
  })
  it('should create an action to toggle devices at design editor', () => {
    const platform = 'facebook'
    const expectedAction = {
      type: 'SET_EDITOR_PLATFORM',
      payload: platform,
    }
    expect(actions.setPlatform(platform)).toEqual(expectedAction)
  })
})
