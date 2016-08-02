import React, { Component, PropTypes } from 'react'
import Summary from 'components/Summary'
import User from 'components/User'

const UserGrid = ({ users }) => (
	<div>
		<h3 className="ita-section-title">Latest Users</h3>
		{users.map( u => <div className="col-md-2" key={u.id}><User name={u.firstName} identifier={u.identifier} small={true} /></div>)}
	</div>
)

export default UserGrid