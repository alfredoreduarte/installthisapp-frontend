import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Application from './containers/Application'
import AdminDashboard from './containers/AdminDashboard'
import AppDashboardContainer from './containers/AppDashboardContainer'
import AppDashboard from './containers/AppDashboard'
import AppAnalytics from './containers/AppAnalytics'
import Users from './containers/Users'
import AppPreferences from './containers/AppPreferences'
import Account from './containers/Account'
import DesignEditor from './containers/DesignEditor'

const routes = (
	<Route path="/" component={Application}>
		<IndexRoute component={AdminDashboard} />
		<Route path="create(/:step)" component={AdminDashboard} />
		<Route path="apps/:checksum" component={AppDashboardContainer}>
			<IndexRoute component={AppDashboard} />
			<Route path="analytics" component={AppAnalytics} />
			<Route path="users" component={Users} />
			<Route path="preferences" component={AppPreferences} />
		</Route>
		<Route path="apps/:checksum/design" component={DesignEditor} />
		<Route path="account" component={Account} />
	</Route>
)

export default routes