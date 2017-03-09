import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { getPhotoById } from 'modules/photo_contest/selectors/photos'
import { getVotesForPhoto } from 'modules/photo_contest/selectors/votes'
import { postDeleteVotes } from 'modules/photo_contest/actions/votes'
import User from 'components/User'

const PhotoDetail = ({ show, user, attachmentUrl, caption, votes, handleClose, handleVoteDelete }) => (
	<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
			<Modal.Title>{user.name}'s photo</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<div className="row">
				<div className="col-md-6">
					<a href={attachmentUrl} target="_blank">
						<img 
						src={attachmentUrl}
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
			<table className="table">
				<tbody>
				{votes.map( vote => 
					<tr key={vote.id}>
						<td>
						<User name={vote.user.name} identifier={vote.user.identifier} small />
						</td>
						<td>
						<button className="btn btn-sm btn-danger btn-outline" onClick={() => handleVoteDelete(vote.id)}>
							Delete
						</button>
						</td>
					</tr>
				)}
				</tbody>
			</table>
		</Modal.Body>
	</Modal>
)

const mapStateToProps = (state, props) => {
	const { user, attachmentUrl, caption } = getPhotoById(state, props.photoId)
	const votes = getVotesForPhoto(state, props.photoId)
	return {
		user,
		attachmentUrl,
		caption,
		votes,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		handleVoteDelete: id => {
			console.log('delete!')
			dispatch(postDeleteVotes([id]))
		},
		handleClose: () => {
			console.log('close!')
			dispatch(push(props.backUrl))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail)