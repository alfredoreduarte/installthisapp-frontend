import _ from 'lodash'

const styles = (state = {
	platform: 'facebook',
	hoveredSelector: [],
	activeSelector: [],
	ruleset: {},
	rules: [
	]
}, action) => {
	switch (action.type) {
		case 'RECEIVE_STYLES':
			return Object.assign({}, state, {
				ruleset: action.payload
			})
		case 'SET_HOVERED_SELECTOR':
			return Object.assign({}, state, {
				hoveredSelector: action.payload
			})
		case 'SET_ACTIVE_SELECTOR':
			return Object.assign({}, state, {
				activeSelector: state.hoveredSelector
			})
		case 'SET_EDITOR_PLATFORM':
			return Object.assign({}, state, {
				platform: action.payload
			})
		case 'SET_STYLES_RESULT':
			// 
			const { selectors, property, value } = action
			const existingRule = _.find(state.rules, {selectors})
			let rules = state.rules
			if (existingRule) {
				const index = rules.indexOf(existingRule)
				const existingDeclaration = _.find(existingRule.declarations, {property})
				const declarations = existingRule.declarations
				if (existingDeclaration) {
					const declarationIndex = existingRule.declarations.indexOf(existingDeclaration)
					declarations[declarationIndex] = {
						type: 'declaration',
						property,
						value
					}
					rules[index] = {
						type: 'rule',
						selectors,
						declarations
					}
				}
				else{
					declarations.push({
						type: 'declaration',
						property,
						value
					})
					rules[index] = {
						type: 'rule',
						selectors,
						declarations
					}
				}
			}
			else{
				rules.push({
					type: 'rule',
					selectors,
					declarations: [
						{
							type: 'declaration',
							property,
							value
						}
					]
				})
			}
			return Object.assign({}, state, {
				rules
			})
		default:
			return state
	}
}

export default styles