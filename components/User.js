import React, { PropTypes } from 'react'
import TimeAgo from 'react-timeago'
import StatusIndicator from 'components/StatusIndicator'
import FbPhoto from 'components/FbPhoto'

const User = ({ name, small, identifier, email, time }) => (
	<div className={`media ita-user ${small ? 'ita-user-small' : ''}`}>
		<div className="media-left media-middle">
			<a href={`https://fb.com/${identifier}`} target="_blank" rel="noopener">
				<FbPhoto className="media-object img-circle" identifier={identifier} />
			</a>
		</div>
		<div className="media-body media-middle">
			<a
				href={`https://fb.com/${identifier}`}
				target="_blank"
				rel="noopener"
				className={`media-heading text-relevant-title weight-normal ${small ? 'h5' : 'h4'}`}>
				{name}
			</a>
			{!small || email ? (
				<p>
					<a href={`mailto:${email}`}>
						<small>{email}</small>
					</a>
				</p>
			) : null}
			{small ? null : (
				<p>
					<a href={`https://fb.com/${identifier}`} target="_blank" rel="noopener">
						<small>fb.com/{identifier}</small>
					</a>
				</p>
			)}
			{!small && time ? (
				<p>
					<small>
						<TimeAgo date={time} />
					</small>
				</p>
			) : null}
		</div>
	</div>
)

User.propTypes = {
	name: PropTypes.string.isRequired,
	email: PropTypes.string,
	time: PropTypes.string,
	identifier: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	small: PropTypes.bool,
}

export default User
