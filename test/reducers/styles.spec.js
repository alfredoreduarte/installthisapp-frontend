import expect from 'expect'
import css from 'css'
import styles from 'reducers/styles'

const cssString = "/*comment*/body{background:red;font-size:18px}/*comment*/.page-title{text-decoration:underline;}.page-title,.text-highlight{color:blue}"
const parsedCss = css.parse(cssString)

describe('Reducers', () => {
	describe('styles', () => {
		it('Should provide the initial state', () => {
			const initialState = {
				platform: 'facebook',
				hoveredSelector: [],
				activeSelector: [],
				ruleset: {},
				results: {},
			}
			expect(styles(undefined, {})).toEqual(initialState)
		})
		it('Should save parsed css object', () => {
			const initialState = {
				platform: 'facebook',
				hoveredSelector: [],
				activeSelector: [],
				ruleset: {},
				results: {},
			}
			const expectedResult = {
				platform: 'facebook',
				hoveredSelector: [],
				activeSelector: [],
				ruleset: parsedCss,
				results: {},
			}
			const action = {
				type: 'RECEIVE_STYLES',
				payload: parsedCss
			}
			expect(styles(initialState, action)).toEqual(expectedResult)
		})
		it('Should save parsed css object', () => {
			const initialState = {
				platform: 'facebook',
				hoveredSelector: [],
				activeSelector: [],
				ruleset: {},
				results: {},
			}
			const expectedResult = {
				platform: 'facebook',
				hoveredSelector: [],
				activeSelector: [],
				ruleset: parsedCss,
				results: {},
			}
			const action = {
				type: 'RECEIVE_STYLES',
				payload: parsedCss
			}
			expect(styles(initialState, action)).toEqual(expectedResult)
		})
		it("Should save the hovered element's selectors", () => {
			const initialState = {
				platform: 'facebook',
				hoveredSelector: [],
				activeSelector: [],
				ruleset: {},
				results: {},
			}
			const expectedResult = {
				platform: 'facebook',
				hoveredSelector: ['.game-text', '.main-title'],
				activeSelector: [],
				ruleset: {},
				results: {},
			}
			const action = {
				type: 'SET_HOVERED_SELECTOR',
				payload: ['.game-text', '.main-title']
			}
			expect(styles(initialState, action)).toEqual(expectedResult)
		})
		it("Should save the selectors for the element currently being edited", () => {
			const initialState = {
				platform: 'facebook',
				hoveredSelector: ['.game-text', '.main-title'],
				activeSelector: [],
				ruleset: {},
				results: {},
			}
			const expectedResult = {
				platform: 'facebook',
				hoveredSelector: ['.game-text', '.main-title'],
				activeSelector: ['.game-text', '.main-title'],
				ruleset: {},
				results: {},
			}
			const action = {
				type: 'SET_ACTIVE_SELECTOR'
			}
			expect(styles(initialState, action)).toEqual(expectedResult)
		})
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
				payload: 'mobile'
			}
			expect(styles(initialState, action)).toEqual(expectedResult)
		})
	})
})