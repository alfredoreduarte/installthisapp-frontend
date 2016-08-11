import React from 'react';
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from 'canvas/Trivia/containers/Root'
import Root from 'containers/Root'
import configureStore from 'canvas/Trivia/store/configureStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
	<Root store={store} history={history} />,
	document.getElementById('root')
)