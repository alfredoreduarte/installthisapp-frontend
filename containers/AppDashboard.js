import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { getCurrentUsers } from '../selectors/users'
import Summary from '../components/Summary'
import UserGrid from '../components/UserGrid'

const AppDashboard = ({ users }) => (
	<div className="">
		<Summary />
		<UserGrid users={users} />
	</div>
)

const mapStateToProps = (state, props) => {
	return { 
		users: _.values(getCurrentUsers(state, props))
	}
}

export default connect(mapStateToProps)(AppDashboard)