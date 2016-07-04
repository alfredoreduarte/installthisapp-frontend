import React, { Component, PropTypes } from 'react'
import AppGrid from './AppGrid'
import AppNavBar from '../components/AppNavBar'
import DashboardTitleBar from '../components/DashboardTitleBar'

let AdminDashboard = () => (
	<div>
		<AppNavBar />
		<DashboardTitleBar />
		<AppGrid />
	</div>
)

export default AdminDashboard