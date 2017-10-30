import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PhotosList from 'canvas/photo_contest/components/PhotosList'
import { digestFacebookResponse } from 'canvas/photo_contest/actions/user'
import { handleUploadIntention } from 'canvas/photo_contest/actions/photos'
import { getAllPhotos } from 'canvas/photo_contest/selectors/photos'

const PhotosListContainer = props => <PhotosList {...props} />

const mapStateToProps = state => ({
	messages: { ...state.messages },
	images: { ...state.images },
	settings: { ...state.settings },
	photos: getAllPhotos(state),
	singlePath: `/photo_contest/${window.checksum}`,
})

const mapDispatchToProps = dispatch => ({
	handleLogin: e => dispatch(digestFacebookResponse(e)).then(() => dispatch(handleUploadIntention())),
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotosListContainer)
