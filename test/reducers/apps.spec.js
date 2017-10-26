import expect from 'expect'
import apps from 'reducers/apps'
import * as actions from 'actions/apps'

describe('Reducers', () => {
  describe('apps', () => {
    it('Should provide the initial state', () => {
      const initialState = {}
      expect(apps(undefined, {})).toEqual(initialState)
    })
    it('Should set app as deleted', () => {
      const initialState = {
        '9KW8J': {
          id: 231312,
          checksum: '9KW8J',
          title: 'App para borrar',
          type: 'trivia',
          status: 'ready',
          scheduled: false,
          page: 411,
          summary: [],
          users: [],
        },
      }
      const expectedResult = {
        '9KW8J': {
          id: 231312,
          checksum: '9KW8J',
          title: 'App para borrar',
          type: 'trivia',
          status: 'deleted',
          scheduled: false,
          page: 411,
          summary: [],
          users: [],
        },
      }
      // const checksum = '9KW8J'
      // const action = {
      // 	type: 'DELETE_APP',
      // 	checksum
      // }
      // expect(apps(initialState, action)).toEqual(expectedResult)
      expect(
        apps(
          initialState,
          actions.updateApp('9KW8J', {
            id: 231312,
            checksum: '9KW8J',
            title: 'App para borrar',
            type: 'trivia',
            status: 'deleted',
            scheduled: false,
            page: 411,
            summary: [],
            users: [],
          })
        )
      ).toEqual(expectedResult)
    })
  })
})
