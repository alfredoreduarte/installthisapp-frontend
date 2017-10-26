import expect from 'expect'
import { getUsersForCurrentApp, getCurrentUsersByKeyword } from 'selectors/users'

const state = {
  usersSorting: 'name',
  filterText: 'he',
  entities: {
    apps: [
      {
        id: 231315,
        checksum: 'LF7H3',
        users: [1, 3],
      },
      {
        id: 231315,
        checksum: 'P97K2',
        users: [1, 2, 3],
      },
    ],
    users: [
      {
        id: 1,
        name: 'Rodrigo Keen',
        createdAt: '2016-05-01T20:46:22.000-04:00',
      },
      {
        id: 2,
        name: 'Alfredo Re',
        createdAt: '2016-02-01T20:46:22.000-04:00',
      },
      {
        id: 3,
        name: 'Mikhail Herrero',
        createdAt: '2016-02-01T20:46:22.000-04:00',
      },
    ],
  },
}
const props = {
  params: {
    checksum: 'LF7H3',
  },
}

describe('selectors', () => {
  describe('getUsersForCurrentApp', () => {
    it('should get users for the currently visible app')
  })
  describe('getCurrentUsersByKeyword', () => {
    it('should filter users array by name (case-insensitive)')
  })
})
