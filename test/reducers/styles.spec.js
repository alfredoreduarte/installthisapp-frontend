import expect from 'expect'
import css from 'css'
import styles from 'reducers/styles'

const cssString =
  '/*comment*/body{background:red;font-size:18px}/*comment*/.page-title{text-decoration:underline;}.page-title,.text-highlight{color:blue}'
const parsedCss = css.parse(cssString)

describe('Reducers', () => {
  describe('styles', () => {
    it('Should provide the initial state')
    it('Should save parsed css object')
    it('Should save parsed css object')
    it("Should save the hovered element's selectors")
    it('Should save the selectors for the element currently being edited')
    it('should set the currently viewed platform', () => {
      const initialState = {
        platform: 'facebook',
        hoveredSelector: [],
        activeSelector: [],
        ruleset: {},
        results: {},
      }
      const expectedResult = {
        platform: 'mobile',
        hoveredSelector: [],
        activeSelector: [],
        ruleset: {},
        results: {},
      }
      const action = {
        type: 'SET_EDITOR_PLATFORM',
        payload: 'mobile',
      }
      expect(styles(initialState, action)).toEqual(expectedResult)
    })
  })
})
