import React, { Component, PropTypes } from 'react'
import TimeAgo from 'react-timeago'
import StatusIndicator from './StatusIndicator'

const User = ({ name, small }) => (
	<div className={`media ita-user ${small ? 'ita-user-small' : ''}`}>
		<div className="media-left media-middle">
			<a href="javascript:void(0)">
				<img className="media-object img-circle" src="/images/user.jpg" />
			</a>
		</div>
		<div className="media-body media-middle">
			<a href="javascript:void(0)" className={`media-heading text-relevant-title weight-normal ${small ? 'h5' : 'h4'}`}>{name}</a>
			{small ? null: <p><a href={"mailto:fdsa"}><small>email</small></a></p>}
			{small ? null: <p><a href={"https://facebook.com/fdsa"} target="_blank"><small>fb.com/fdsa</small></a></p>}
			{small ? null: <p><small><TimeAgo date={Date.now()} /></small></p>}
		</div>
	</div>
)

export default User