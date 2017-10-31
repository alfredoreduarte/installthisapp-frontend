import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import FbPhoto from 'canvas/capture_the_flag/components/FbPhoto'
import { toHHMMSS } from 'canvas/capture_the_flag/selectors/entries'

const TopUsers = ({ entries, flagLabel }) => (
	<div className="container" id="top-users">
		{entries.map(entry => (
			<div key={entry.id} className="top-user">
				<FbPhoto identifier={entry.user.identifier} className="top-user-pic" />
				{false && <p>{moment.duration(entry.elapsedSeconds, 'seconds').humanize()}</p>}
				<p>{entry.hasFlag ? flagLabel : toHHMMSS(entry.elapsedSeconds)}</p>
			</div>
		))}
	</div>
)

TopUsers.propTypes = {}

export default TopUsers
