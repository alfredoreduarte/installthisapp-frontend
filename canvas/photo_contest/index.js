import React from 'react';
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from 'canvas/photo_contest/containers/Root'
import configureStore from 'canvas/photo_contest/store/configureStore'
require('lib/addToHomeScreen.js')

const store = configureStore({
	applicationData: {
		checksum: window.checksum,
		canvasId: window.canvasId,
		appId: window.facebookAppId,
	}
})
const history = syncHistoryWithStore(browserHistory, store)

render(
	<Root store={store} history={history} />,
	document.getElementById('root')
)