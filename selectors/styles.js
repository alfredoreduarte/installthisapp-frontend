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

export const getDeclarationsForCurrentSelector = createSelector(
	getActiveStylesSelector,
	getAllRules,
	(selectorArray, allRules) => {
		const selectedRules = _.filter(allRules, rule => {
			const intersection = _.intersection(rule.selectors, selectorArray)
			return intersection.length > 0 ? true : false
		})
		const rulesCollection = selectedRules.map( obj => {
			return obj.declarations.map( dec => {
				return {
					property: dec.property,
					value: dec.value
				}
			})
		})
		return _.orderBy(_.flattenDeep(rulesCollection), 'property')
	}
)