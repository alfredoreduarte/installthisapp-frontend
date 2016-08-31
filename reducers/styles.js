import _ from 'lodash'

const styles = (state = {
	platform: 'mobile',
	hoveredSelector: [],
	activeSelector: [],
	ruleset: {},
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
		case 'MODIFY_STYLE':
			// Los comentarios con * son referencias a funciones en la versión pre-redux
			// *parseCssRules
			// Creo un array de rules que van a ser modificados
			// Esto ahorra loops más costosos al crear los rules con valores alterados
			const rulesBeingEdited = _.filter(state.ruleset.stylesheet.rules, rule =>{
				// veo si hay clases en común entre el rule y lo seleccionado
				return _.intersection(rule.selectors, action.selectors).length > 0
			})
			// *handleChange
			const newEditedRules = rulesBeingEdited.map( rule => {
				const newDeclarations = rule.declarations.map( declaration => {
					if (declaration.property == action.property) {
						return Object.assign({}, declaration, {
							value: action.value
						})
					}
					return declaration
				})
				return Object.assign({}, rule, {
					declarations: newDeclarations
				})
			})
			// *replaceRule
			const newRules = state.ruleset.stylesheet.rules.map(rule => {
				if (_.intersection(rule.selectors, action.selectors).length > 0) {
					return _.find(newEditedRules, newRule => _.isEqual(newRule.selectors, rule.selectors))
				}
				return rule
			})
			return Object.assign({}, state, {
				ruleset: Object.assign({}, state.ruleset, {
					stylesheet: Object.assign({}, state.ruleset.stylesheet, {
						rules: newRules
					})
				})
			})
		default:
			return state
	}
}

export default styles