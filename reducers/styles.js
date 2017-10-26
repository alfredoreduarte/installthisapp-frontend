import _ from 'lodash'

const initialState = {
  // platform: 'desktop',
  platform: 'mobile',
  screen: 'intro',
  componentsOrBody: 'content',
  hoveredSelector: [],
  activeSelector: [],
  ruleset: {},
  hoveredMessageKey: null,
  currentMessageKey: null,
  messages: {},
  images: {},
}

const styles = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_EDITOR':
      return initialState
    case 'SET_SCREEN':
      return {
        ...state,
        screen: action.screen,
      }
    case 'SET_MESSAGE_KEY':
      return { ...state, ...{ currentMessageKey: state.hoveredMessageKey } }
    case 'SET_HOVERED_KEY':
      return { ...state, ...{ hoveredMessageKey: action.payload } }
    case 'EDIT_MESSAGES':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.key]: action.value,
        },
      }
    case 'RECEIVE_MESSAGES':
      return { ...state, messages: action.payload }
    case 'EDIT_IMAGES':
      return {
        ...state,
        images: {
          ...state.images,
          [action.key]: action.value,
        },
      }
    case 'RECEIVE_IMAGES':
      return { ...state, images: action.payload }
    case 'RECEIVE_SETTINGS':
      return { ...state, settings: action.payload }
    case 'RECEIVE_STYLES':
      return {
        ...state,
        ruleset: action.payload,
      }
    case 'SET_HOVERED_SELECTOR':
      return {
        ...state,
        hoveredSelector: action.payload,
      }
    case 'RESET_ACTIVE_SELECTOR':
      return {
        ...state,
        activeSelector: [],
        componentsOrBody: 'components',
      }
    case 'SET_CONTENT_EDITOR':
      return {
        ...state,
        componentsOrBody: 'content',
      }
    case 'SET_ACTIVE_SELECTOR':
      const activeSelector = action.payload ? action.payload : state.hoveredSelector
      const componentsOrBody = action.payload ? 'body' : 'components'
      return {
        ...state,
        activeSelector,
        componentsOrBody,
      }
    case 'SET_EDITOR_PLATFORM':
      return {
        ...state,
        platform: action.payload,
      }
    case 'MODIFY_STYLE':
      // Los comentarios con * son referencias a funciones en la versión pre-redux
      // *parseCssRules
      // Creo un array de rules que van a ser modificados
      // Esto ahorra loops más costosos al crear los rules con valores alterados
      const rulesBeingEdited = _.filter(state.ruleset.stylesheet.rules, rule => {
        // veo si hay clases en común entre el rule y lo seleccionado
        return _.intersection(rule.selectors, action.selectors).length > 0
      })
      // *handleChange
      const newEditedRules = rulesBeingEdited.map(rule => {
        const newDeclarations = rule.declarations.map(declaration => {
          if (declaration.property == action.property) {
            return {
              ...declaration,
              value: action.value,
            }
          }
          return declaration
        })
        return {
          ...rule,
          declarations: newDeclarations,
        }
      })
      // *replaceRule
      const newRules = state.ruleset.stylesheet.rules.map(rule => {
        if (_.intersection(rule.selectors, action.selectors).length > 0) {
          return _.find(newEditedRules, newRule => _.isEqual(newRule.selectors, rule.selectors))
        }
        return rule
      })
      return {
        ...state,
        ruleset: {
          ...state.ruleset,
          stylesheet: {
            ...state.ruleset.stylesheet,
            rules: newRules,
          },
        },
      }
    default:
      return state
  }
}

export default styles
