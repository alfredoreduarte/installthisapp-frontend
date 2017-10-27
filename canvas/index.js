import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'canvas/common-store/configureStore'
//
// Useless?
//
// require('lib/addToHomeScreen.js')

const createReducerGetter = moduleName => require(`canvas/${moduleName}/reducers/index`).default
const RootGetter = moduleName => require(`canvas/${moduleName}/containers/Root`).default

export default moduleName => {
	const createReducer = createReducerGetter(moduleName)
	const Root = RootGetter(moduleName)
	const store = configureStore(
		{
			applicationData: {
				checksum: window.checksum,
				canvasId: window.canvasId,
				appId: window.facebookAppId,
			},
		},
		createReducer
	)
	const history = syncHistoryWithStore(browserHistory, store)

	render(<Root store={store} history={history} />, document.getElementById('root'))
}
