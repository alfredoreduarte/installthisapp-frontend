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
			// Los comentarios son referencias a funciones en la versión pre-redux
			// parseCssRules
			// creo un array de rules que van a ser modificados
			const rulesBeingEdited = _.filter(state.ruleset.stylesheet.rules, function(rule){
				// veo si hay classnames en común entre el rule y lo seleccionado, y si el rule es de tipo 'rule'
				if (_.intersection(rule.selectors, action.selectors).length > 0 && rule.type == 'rule') {
					return true
				}
				else{
					return false
				}
			})
			// handleChange
			const newEditedRules = rulesBeingEdited.map( rule => {
				const newDeclarations = rule.declarations.map( declaration => {
					if (declaration.property == action.property) {
						return Object.assign({}, declaration, {
							value: action.value
						})
					}
					else{
						return declaration
					}
				})
				return Object.assign({}, rule, {
					declarations: newDeclarations
				})
			})
			// replaceRule
			const newRules = state.ruleset.stylesheet.rules.map(rule => {
				if (_.intersection(rule.selectors, action.selectors).length > 0) {
					if (newEditedRules.length > 1) { console.error('newEditedRules contains more than one element') }
					return newEditedRules[0]
				}
				else{
					return rule
				}
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