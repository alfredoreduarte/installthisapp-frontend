import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getSignedRequest, postPhoto } from 'canvas/photo_contest/actions/photos'
import { fetchEntities } from 'canvas/photo_contest/actions'
import Loading from 'canvas/photo_contest/components/Loading'
import UploadView from 'canvas/photo_contest/components/Upload'

class Upload extends Component {
	render(){
		const { loading } = this.props
		return !loading ? <UploadView { ...this.props } /> : <Loading />
	}
}

const mapStateToProps = state => {
	return {
		...state.messages,
		headerImg: state.images.header,
		footerImg: state.images.footer,
		userName: state.loggedUser.name,
		userIdentifier: state.loggedUser.identifier,
		busy: state.activityIndicators.photoUpload,
		loading: false,
		backUrl: `/${window.canvasId}/${window.checksum}/photos`,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		uploadPhoto: e => {
			// Upload Image first
			const input = e.target
			const file = document.querySelector("[name='photo[attachment]']").files[0]
			if (file == null) {return false}
			dispatch(getSignedRequest(file)).then(fileUrl => {
				// Create photo object
				let formData = new FormData()
				formData.append('photo[caption]', document.querySelector("[name='photo[caption]']").value)
				formData.append('photo[attachment_url]', fileUrl)
				dispatch(postPhoto(formData)).then( response => {
					dispatch(fetchEntities()).then(() => dispatch(push(`/${window.canvasId}/${window.checksum}/${response.id}`)))
				})
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)