import _ from 'lodash'
import { createSelector } from 'reselect'

const getCurrentStylesSelector = state => state.styles.currentSelector
const getStylesObject = state => state.styles.ruleset

export const getRulesetForCurrentSelector = createSelector(
	getCurrentStylesSelector,
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