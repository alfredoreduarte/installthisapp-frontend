import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { getPhotoById } from 'modules/photo_contest/selectors/photos'
import { getVotesForPhoto } from 'modules/photo_contest/selectors/votes'
import User from 'components/User'

const PhotoDetail = ({ show, user, thumbnailUrl, assetUrl, caption, votes, handleClose }) => (
	<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
			<Modal.Title>{user.name}'s photo</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<div className="row">
				<div className="col-md-6">
					<a href={assetUrl} target="_blank">
						<img 
						src={thumbnailUrl}
						className="img-responsive img-rounded" />
					</a>
				</div>
				<div className="col-md-6">
					<blockquote>
						<p>{caption}</p>
					</blockquote>
					<h5><b>{votes.length} votes</b></h5>
				</div>
			</div>
			<hr/>
			<h5><b>Voters</b></h5>
			<ul className="list-group">
				{votes.map( vote => 
					<li key={vote.id} className="list-group-item">
						<User name={vote.user.name} identifier={vote.user.identifier} small />
					</li>
				)}
			</ul>
		</Modal.Body>
	</Modal>
)

const mapStateToProps = (state, props) => {
	const { user, thumbnailUrl, assetUrl, caption } = getPhotoById(state, props.photoId)
	const votes = getVotesForPhoto(state, props.photoId)
	return {
		user,
		thumbnailUrl,
		assetUrl,
		caption,
		votes,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		handleClose: () => {
			console.log('close!')
			dispatch(push(props.backUrl))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail)