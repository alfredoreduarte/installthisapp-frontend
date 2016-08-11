import React from 'react';
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from 'canvas/trivia/containers/Root'
import configureStore from 'canvas/trivia/store/configureStore'
require('assets/canvas/base.sass')

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
	<Root store={store} history={history} />,
	document.getElementById('root')
)