import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { postVote } from 'canvas/photo_contest/actions/votes'
import { allPhotos } from 'canvas/photo_contest/selectors/photos'
import Loading from 'canvas/photo_contest/components/Loading'
import IndexView from 'canvas/photo_contest/components/Index'

class Index extends Component {
	render(){
		const { loading } = this.props
		return !loading ? <IndexView { ...this.props } /> : <Loading />
	}
}

const mapStateToProps = state => {
	return {
		photos: allPhotos(state),
		uploadUrl: `/${window.canvasId}/${window.checksum}/upload`,
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

export default connect(mapStateToProps, mapDispatchToProps)(Index)