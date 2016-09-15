import _ from 'lodash'

const initialState = {
	platform: 'facebook',
	screen: 'index',
	componentsOrBody: 'components',
	hoveredSelector: [],
	activeSelector: [],
	ruleset: {},
	hoveredMessageKey: null,
	currentMessageKey: null,
	messages: {},
}

const styles = (state = initialState, action) => {
	switch (action.type) {
		case 'RESET_EDITOR':
			return initialState
		case 'SET_SCREEN':
			return Object.assign({}, state, {
				screen: action.screen
			})
		case 'SET_MESSAGE_KEY':
			return { ...state, ...{currentMessageKey: state.hoveredMessageKey} }
		case 'SET_HOVERED_KEY':
			return { ...state, ...{hoveredMessageKey: action.payload} }
		case 'EDIT_MESSAGES':
			return Object.assign({}, state, {
				messages: Object.assign({}, state.messages, {
					[action.key]: action.value
				})
			})
		case 'RECEIVE_MESSAGES':
			return { ...state, messages: action.payload }
		case 'RECEIVE_STYLES':
			return Object.assign({}, state, {
				ruleset: action.payload
			})
		case 'SET_HOVERED_SELECTOR':
			return Object.assign({}, state, {
				hoveredSelector: action.payload
			})
		case 'RESET_ACTIVE_SELECTOR':
			return Object.assign({}, state, {
				activeSelector: [],
				componentsOrBody: 'components'
			})
		case 'SET_ACTIVE_SELECTOR':
			const activeSelector = action.payload ? action.payload : state.hoveredSelector
			const componentsOrBody = action.payload ? 'body' : 'components'
			return Object.assign({}, state, {
				activeSelector,
				componentsOrBody,
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