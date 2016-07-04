import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import adminUser from './adminUser'
import apps from './apps'

const rootReducer = combineReducers({
	routing,
	adminUser,
	apps,
	form: formReducer
})

export default rootReducer