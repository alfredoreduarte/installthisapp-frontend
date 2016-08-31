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
		let temp = {
			property: 'texts',
			value: [],
		}
		let rulesCollection = selectedRules.map( obj => {
			return obj.declarations.map( dec => {
				if (dec.property == 'font-weight' || dec.property == 'text-transform' || dec.property == 'text-decoration' || dec.property == 'font-style') {
					console.log('ep!', dec.property)
					temp.value.push({
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
		console.log('pre', rulesCollection)
		rulesCollection = _.filter(rulesCollection, o => o != null)
		if (rulesCollection.length) {
			rulesCollection.push(temp)
		}
		console.log('queda asi', rulesCollection)
		return _.orderBy(rulesCollection, elem => {
			const order = {
				'font-family': 1,
				'text-align': 2,
				'texts': 3,
				'color': 4,
				'border-color': 5,
				'background-color': 6,
				'font-size': 7,
				'font-weight': 8,
				'font-style': 9,
				'text-decoration': 10,
				'text-transform': 11,
			}
			return order[elem.property]
		})
	}
)