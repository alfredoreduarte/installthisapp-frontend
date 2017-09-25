import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Modal from 'react-modal'
import User from 'components/User'

const UserDetails = ({
	show,
	handleClose,
	name,
	identifier,
	likes,
	comments,
}) =>
<Modal
	isOpen={show}
	onAfterOpen={() => console.log('afteropen')}
	onRequestClose={handleClose}
	contentLabel="Modal"
>
	<div className="col-md-12">
		<a href="javascript:void(0)" onClick={handleClose}><small>← back</small></a>
	</div>
	<div className="col-md-4 col-md-offset-4" style={{marginTop: '20px', marginBottom: '20px'}}>
		<User name={name} identifier={identifier} />
	</div>
	<div className="col-md-6">
		<p><b>Likes</b></p>
		<ul className="list-group">
			{likes.map(like => <li className="list-group-item" key={like.parentId + like.postId + like.createdTime}>
				<a target="_blank" href={`https://fb.com/${like.parentId}`}>Go to post</a>
				<span className="badge">{moment(like.createdTime).format("dddd, MMMM Do YYYY")}</span>
			</li>)}
		</ul>
		{likes.length > 0 || <p><i>This user has not liked any post in the current time period</i></p>}
	</div>
	<div className="col-md-6">
		<p><b>Comments</b></p>
		<ul className="list-group">
			{comments.map(comment => <li className="list-group-item" key={comment.parentId + comment.postId + comment.createdTime}>
				<a target="_blank" href={`https://fb.com/${comment.parentId}`}>Go to post</a>
				{' | '}
				<i>"{comment.message.substr(0, 12)}..."</i>
				<span className="badge">{moment(comment.createdTime).format("dddd, MMMM Do YYYY")}</span>
			</li>)}
		</ul>
		{comments.length > 0 || <p><i>This user has not commented on any post in the current time period</i></p>}
	</div>
</Modal>


export default UserDetails