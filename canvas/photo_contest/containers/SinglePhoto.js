import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { postVote } from 'canvas/photo_contest/actions/votes'
import { currentPhoto } from 'canvas/photo_contest/selectors/photos'
import Loading from 'canvas/photo_contest/components/Loading'
import SingleView from 'canvas/photo_contest/components/SingleView'

class SinglePhoto extends Component {
	render(){
		const { loading } = this.props
		return !loading ? <SingleView { ...this.props } /> : <Loading />
	}
}

const mapStateToProps = (state, props) => {
	const photo = currentPhoto(state, props)
	return {
		...state.messages,
		voted: _.filter(_.values(state.entities.votes), v => {
			return v.userId == state.loggedUser.id && v.photoId == photo.id
		}).length > 0,
		photo,
		uploadUrl: `/${window.canvasId}/${window.checksum}/upload`,
		backUrl: `/${window.canvasId}/${window.checksum}`,
		loading: false,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleVote: id => {
			dispatch(postVote(id)).then( response => {
				
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePhoto)