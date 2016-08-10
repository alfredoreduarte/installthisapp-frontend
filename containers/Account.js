import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AppNavBar from 'components/AppNavBar'
import TitleBar from 'components/TitleBar'
import AccountSidebar from 'components/AccountSidebar'
import DashboardContentDecorator from 'containers/DashboardContentDecorator'
import AccountPreferences from 'components/AccountPreferences'

const Account = ({ children, admin }) => (
	<div>
		<AppNavBar />
		<TitleBar title="My Account" />
		<AccountSidebar />
		<DashboardContentDecorator>
			<AccountPreferences user={admin} />
			{children}
		</DashboardContentDecorator>
	</div>
)

const mapStateToProps = ({ admin }) => {
	return { 
		admin
	}
};

export default connect(mapStateToProps)(Account)