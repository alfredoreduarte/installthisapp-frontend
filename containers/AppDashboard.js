import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { getUsersForCurrentApp } from 'selectors/users'
import { getCurrentApp } from 'selectors/apps'
import Summary from 'components/Summary'
import UserGrid from 'components/UserGrid'

// Hiding summary and usergrid because top fans doesn't have that data yet
const AppDashboard = ({ users, summary }) => (
	<div className="hide">
		<Summary data={summary} />
		<UserGrid users={users} />
	</div>
)

const mapStateToProps = (state, props) => {
	return { 
		summary: getCurrentApp(state, props).statsSummary || [],
		users: _.values(getUsersForCurrentApp(state, props))
	}
}

export default connect(mapStateToProps)(AppDashboard)