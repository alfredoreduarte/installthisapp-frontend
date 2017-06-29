import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AppNavBar from 'components/AppNavBar'
import TitleBar from 'components/TitleBar'
import AccountSidebar from 'components/AccountSidebar'
import DashboardContentDecorator from 'containers/DashboardContentDecorator'

const Console = ({ children, enabled }) => (
	<div>
		<AppNavBar />
		<TitleBar title="API Console" />
		{enabled ? 
			<DashboardContentDecorator>
				{React.cloneElement(children)}
			</DashboardContentDecorator>
		:
			<p>Not authorized</p>
		}
	</div>
)

const mapStateToProps = ({ admin }) => ({ 
	enabled: admin.id === 5
})

export default connect(mapStateToProps)(Console)