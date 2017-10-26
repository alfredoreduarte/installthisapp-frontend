import _ from 'lodash'

const filterText = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_FILTERTEXT':
      return action.payload
    case 'CLEAR_FILTERTEXT':
    case '@@router/LOCATION_CHANGE':
      return ''
    default:
      return state
  }
}

export default filterText
