import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { postPhoto } from 'canvas/photo_contest/actions/photos'
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
		loading: false,
		backUrl: `/${window.canvasId}/${window.checksum}`,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		uploadPhoto: e => {
			let formData = new FormData()
			formData.append('photo[caption]', document.querySelector("[name='photo[caption]']").value)
			formData.append('photo[attachment]', document.querySelector("[name='photo[attachment]']").files[0])
			dispatch(postPhoto(formData)).then( response => {
				dispatch(push(`/${window.canvasId}/${window.checksum}/${response.id}`))
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)