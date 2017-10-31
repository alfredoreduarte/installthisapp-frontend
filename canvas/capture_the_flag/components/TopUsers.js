import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import FbPhoto from 'canvas/capture_the_flag/components/FbPhoto'

const TopUsers = ({ entries }) => (
	<div className="container" id="top-users">
		{entries.map(entry => (
			<div key={entry.id} className="top-user">
				<FbPhoto identifier={entry.user.identifier} className="top-user-pic" />
				<p>{moment.duration(entry.elapsedSeconds, 'seconds').humanize()}</p>
			</div>
		))}
	</div>
)

TopUsers.propTypes = {}

export default TopUsers
