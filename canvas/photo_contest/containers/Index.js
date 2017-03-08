import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { postVote } from 'canvas/photo_contest/actions/votes'
import { sortPhotos } from 'canvas/photo_contest/actions/sort'
import { search } from 'canvas/photo_contest/actions/search'
import { photosBySearchQuery, photosByUploaderId } from 'canvas/photo_contest/selectors/photos'
import Loading from 'canvas/photo_contest/components/Loading'
import IndexView from 'canvas/photo_contest/components/Index'

class Index extends Component {
	render(){
		const { loading } = this.props
		return !loading ? <IndexView { ...this.props } /> : <Loading />
	}
}

const mapStateToProps = state => {
	const ownPhoto = photosByUploaderId(state)
	return {
		...state.messages,
		headerImg: state.images.header,
		footerImg: state.images.footer,
		canUpload: ownPhoto.length == 0,
		loggedUser: state.loggedUser,
		votes: state.entities.votes,
		sort: state.sort,
		searchQuery: state.search,
		photos: photosBySearchQuery(state),
		uploadUrl: `/${window.canvasId}/${window.checksum}/upload`,
		singlePhotoUrl: `/${window.canvasId}/${window.checksum}`,
		loading: false,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		search: query => dispatch(search(query)),
		sortPhotos: sort => dispatch(sortPhotos(sort)),
		handleVote: id => {
			dispatch(postVote(id)).then( response => {
				
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)