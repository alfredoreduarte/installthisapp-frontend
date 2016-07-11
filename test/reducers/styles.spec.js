import expect from 'expect'
import css from 'css'
import styles from 'reducers/styles'

const cssString = "/*comment*/body{background:red;font-size:18px}/*comment*/.page-title{text-decoration:underline;}.page-title,.text-highlight{color:blue}"
const parsedCss = css.parse(cssString)

describe('Reducers', () => {
	describe('styles', () => {
		it('Should provide the initial state', () => {
			const initialState = {
				currentSelector: [],
				ruleset: {}
			}
			expect(styles(undefined, {})).toEqual(initialState)
		})
		it('Should save parsed css object', () => {
			const initialState = {
				currentSelector: [],
				ruleset: {}
			}
			const expectedResult = {
				currentSelector: [],
				ruleset: parsedCss
			}
			const action = {
				type: 'RECEIVE_STYLES',
				payload: parsedCss
			}
			expect(styles(initialState, action)).toEqual(expectedResult)
		})
	})
})