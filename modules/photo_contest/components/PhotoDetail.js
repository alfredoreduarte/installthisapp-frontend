import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { getPhotoById } from 'modules/photo_contest/selectors/photos'
import { getVotesForPhoto } from 'modules/photo_contest/selectors/votes'
import User from 'components/User'

const PhotoDetail = ({ show, user, url, caption, votes }) => (
	<Modal show={show}>
		<Modal.Header closeButton>
			<Modal.Title>{user.name}'s photo</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<img 
				src={url} 
				style={{width: '100px'}} 
				className="img-responsive img-rounded" />
			<h4>Caption</h4>
			<p>{caption}</p>
			<h4>Votes: {votes.length}</h4>
			<ul>
				{votes.map( vote => 
					<li key={vote.id}>
						<User name={vote.user.name} identifier={vote.user.identifier} small />
					</li>
				)}
			</ul>
		</Modal.Body>
		<Modal.Footer>
			
		</Modal.Footer>
	</Modal>
)

const mapStateToProps = (state, props) => {
	const { user, assetUrl, caption } = getPhotoById(state, props.photoId)
	const votes = getVotesForPhoto(state, props.photoId)
	return {
		user,
		url: assetUrl,
		caption,
		votes,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail)