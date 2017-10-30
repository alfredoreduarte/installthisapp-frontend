import React from 'react'
import { connect } from 'react-redux'
import { postVote } from 'canvas/photo_contest/actions/votes'
import { getCurrentPhoto } from 'canvas/photo_contest/selectors/photos'
import { digestFacebookResponse } from 'canvas/photo_contest/actions/user'
import Single from 'canvas/photo_contest/components/Single'

const SingleContainer = props => <Single {...props} />

const mapStateToProps = (state, props) => ({
	messages: { ...state.messages },
	images: { ...state.images },
	settings: { ...state.settings },
	photo: getCurrentPhoto(state, props),
	listPath: `/photo_contest/${window.checksum}/`,
})

const mapDispatchToProps = dispatch => ({
	handleVote: (e, id) =>
		dispatch(digestFacebookResponse(e)).then(() => {
			dispatch(postVote(id))
		}),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleContainer)
