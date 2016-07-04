import React, { Component, PropTypes } from 'react'
import Summary from '../components/Summary'
import UserGrid from '../components/UserGrid'

const AppDashboard = ({ active }) => (
	<div className="">
		<Summary />
		<UserGrid />
	</div>
)

export default AppDashboard