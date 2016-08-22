import React from 'react';
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from 'canvas/top_fans/containers/Root'
import configureStore from 'canvas/top_fans/store/configureStore'
require('assets/canvas/base.sass')

const store = configureStore({
	applicationData: {
		checksum: window.checksum,
		// apiKey: window.canvasApiKey,
		canvasId: window.canvasId,
		appId: window.appId,
	}
})
const history = syncHistoryWithStore(browserHistory, store)

render(
	<Root store={store} history={history} />,
	document.getElementById('root')
)