import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import applicationData from 'canvas/top_fans/reducers/applicationData'
// import entities from 'canvas/top_fans/reducers/entities'
// import answeredQuestions from 'canvas/top_fans/reducers/answeredQuestions'
// import answers from 'canvas/top_fans/reducers/answers'
// import settings from 'canvas/top_fans/reducers/settings'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		applicationData,
		// entities,
		// answeredQuestions,
		// answers,
		// settings,
	})
}

export default createReducer