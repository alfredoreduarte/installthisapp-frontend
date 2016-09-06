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
	console.log('losprops', props)
	return {
		photo: currentPhoto(state, props),
		uploadUrl: `/${window.canvasId}/${window.checksum}/upload`,
		backUrl: `/${window.canvasId}/${window.checksum}`,
		loading: false,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleVote: id => {
			let formData = new FormData()
			formData.append('vote[photo_id]', id)
			dispatch(postVote(formData)).then( response => {
				
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePhoto)