import React, { Component, PropTypes } from 'react'
import AppNavBar from '../components/AppNavBar'
import AppTitleBar from '../components/AppTitleBar'
import Sidebar from '../components/Sidebar'
import DashboardContentDecorator from '../containers/DashboardContentDecorator'

const AppDashboardContainer = ({ children }) => (
	<div>
		<AppNavBar />
		<AppTitleBar />
		<Sidebar />
		<DashboardContentDecorator>
			{children}
		</DashboardContentDecorator>
	</div>
)

export default AppDashboardContainer