import expect from 'expect'
import css from 'css'

import { 
	getRulesetForCurrentSelector
} from 'selectors/styles'

const cssString = "/*comment*/body{background:red;font-size:18px}/*comment*/.page-title{text-decoration:underline;}.page-title,.text-highlight{color:blue}"
const parsedCss = css.parse(cssString)

describe('selectors', () => {
	describe('getRulesetForCurrentSelector', () => {
		it('should get the ruleset for a given selector', () => {
			const state = {
				styles: {
					currentSelector: ['.game-title', '.page-title'],
					ruleset: parsedCss
				}
			}
			const result = getRulesetForCurrentSelector(state)
			expect(result).toBeAn(Array)
			expect(result.length).toEqual(2)
			expect(result[0].selectors).toEqual(['.page-title'])
			expect(result[1].selectors).toEqual(['.page-title', '.text-highlight'])
		})
	})
})
