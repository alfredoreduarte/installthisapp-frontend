import _ from 'lodash'
import { createSelector } from 'reselect'
import css from 'css'

const getHoveredStylesSelector = state => state.styles.hoveredSelector
const getActiveStylesSelector = state => state.styles.activeSelector
const getStylesObject = state => state.styles.ruleset
const getStylesResult = state => state.styles.rules

export const getStringifiedRuleset = state => `<style>${css.stringify(state.styles.ruleset)}</style>`

const getAllRules = createSelector(
	getStylesObject,
	styles => {
		const allRules = _.filter(styles.stylesheet.rules, {'type': 'rule'})
		return allRules
	}
)

export const getRulesetForActiveSelector = createSelector(
	getActiveStylesSelector,
	getAllRules,
	(selectorArray, allRules) => {
		// console.log('selectorArray', selectorArray)
		const selectedRules = _.filter(allRules, rule => {
			const intersection = _.intersection(rule.selectors, selectorArray)
			return intersection.length > 0 ? true : false
		})
		return selectedRules
	}
)