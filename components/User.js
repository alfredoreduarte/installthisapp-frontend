import React, { PropTypes } from 'react'
import TimeAgo from 'react-timeago'
import StatusIndicator from 'components/StatusIndicator'
import FbPhoto from 'components/FbPhoto'

const User = ({ name, small, identifier }) => (
	<div className={`media ita-user ${small ? 'ita-user-small' : ''}`}>
		<div className="media-left media-middle">
			<a href={`https://fb.com/${identifier}`} target="_blank">
				<FbPhoto className="media-object img-circle" identifier={identifier} />
			</a>
		</div>
		<div className="media-body media-middle">
			<a 
				href={`https://fb.com/${identifier}`} 
				target="_blank" 
				className={`media-heading text-relevant-title weight-normal ${small ? 'h5' : 'h4'}`}>
					{name}
				</a>
			{small ? null: <p><a href={"mailto:fdsa"}><small>email</small></a></p>}
			{small ? null: <p><a href={`https://fb.com/${identifier}`} target="_blank"><small>fb.com/{identifier}</small></a></p>}
			{small ? null: <p><small><TimeAgo date={Date.now()} /></small></p>}
		</div>
	</div>
)

User.propTypes = {
	name: PropTypes.string.isRequired,
	identifier: PropTypes.string.isRequired,
	small: PropTypes.bool,
}

export default User