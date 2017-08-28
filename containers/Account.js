import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AppNavBar from 'components/AppNavBar'
import PipeLeadAppNavBar from 'leadgen/components/AppNavBar'
import TitleBar from 'components/TitleBar'
import AccountSidebar from 'components/AccountSidebar'
import DashboardContentDecorator from 'containers/DashboardContentDecorator'

const Account = ({ children, admin, leadgenNavbar }) => (
	<div>
		{leadgenNavbar ? <PipeLeadAppNavBar /> : <AppNavBar />}
		<TitleBar title="My Account" />
		<AccountSidebar />
		<DashboardContentDecorator>
			{React.cloneElement(children, { admin })}
		</DashboardContentDecorator>
	</div>
)

const mapStateToProps = ({ admin }) => {
	return { 
		admin,
		leadgenNavbar: window.location.hostname.indexOf('pipelead.') >= 0,
	}
}

export default connect(mapStateToProps)(Account)