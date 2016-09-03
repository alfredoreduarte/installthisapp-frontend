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
		// 
		// Collect text styles
		// 
		let textStyles = {
			property: 'texts',
			value: [],
		}
		let rulesCollection = selectedRules.map( obj => {
			return obj.declarations.map( dec => {
				if (dec.property == 'font-weight' || dec.property == 'text-transform' || dec.property == 'text-decoration' || dec.property == 'font-style') {
					textStyles.value.push({
						property: dec.property,
						value: dec.value
					})
					return null
				}
				return {
					property: dec.property,
					value: dec.value
				}
			})
		})
		rulesCollection = _.flattenDeep(rulesCollection)
		rulesCollection = _.filter(rulesCollection, o => o != null)
		if (rulesCollection.length && textStyles.value.length) {
			rulesCollection.push(textStyles)
		}
		return _.orderBy(rulesCollection, elem => {
			const order = {
				'font-family': 1,
				'text-align': 2,
				'texts': 3,
				'color': 4,
				'border-color': 5,
				'background-color': 6,
				'font-size': 7,
				'background-image': 8,
			}
			return order[elem.property]
		})
	}
)