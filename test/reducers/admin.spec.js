import expect from 'expect'
import admin from 'reducers/admin'
import * as actions from 'actions/admin'

describe('Reducers', () => {
  describe('admin', () => {
    it('Should provide the initial state')
    describe('When receiving data', () => {
      it('should save admin data', () => {
        const expectedResult = {
          id: 123,
          name: 'Alfredo Re',
          firstName: 'Alfredo',
          lastName: 'Re',
          email: 'alfredoreduarte@gmail.com',
        }
        expect(admin({}, actions.receiveAdmin(expectedResult))).toEqual(expectedResult)
      })
    })
  })
})
