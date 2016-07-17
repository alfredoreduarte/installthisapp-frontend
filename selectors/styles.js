import _ from 'lodash'
import { createSelector } from 'reselect'
import css from 'css'

const getHoveredStylesSelector = state => state.styles.hoveredSelector
const getActiveStylesSelector = state => state.styles.activeSelector
const getStylesObject = state => state.styles.ruleset
const getStylesResult = state => state.styles.rules

export const getStylesResultAsCss = createSelector(
	getStylesResult,
	getActiveStylesSelector,
	(rulesArray, selectors) => {
		const stylesArray = rulesArray.map(rule => {
			const formatted = {
				type: 'stylesheet',
				stylesheet: {
					rules: [rule]
				}
			}
			const stringified = css.stringify(formatted)
			const toReturn = `<style id="fdas">
				${stringified}
			</style>`
			return toReturn
		})
		return stylesArray
	}
)

export const getRulesetForActiveSelector = createSelector(
	getActiveStylesSelector,
	getStylesObject,
	(selectorArray, styles) => {
		const allRules = _.filter(styles.stylesheet.rules, {'type': 'rule'})
		const selectedRules = _.filter(allRules, rule => {
			const intersection = _.intersection(rule.selectors, selectorArray)
			return intersection.length > 0 ? true : false
		})
		return selectedRules
	}
)