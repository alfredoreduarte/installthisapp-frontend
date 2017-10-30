import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { uploadPhoto } from 'canvas/photo_contest/actions/photos'
import Upload from 'canvas/photo_contest/components/Upload'

let UploadContainer = props => <Upload {...props} />

UploadContainer = reduxForm({
	form: 'uploadForm',
})(UploadContainer)

const selector = formValueSelector('uploadForm')

const mapStateToProps = state => ({
	messages: { ...state.messages },
	images: { ...state.images },
	settings: { ...state.settings },
	formValues: selector(state, 'caption', 'attachmentUrl'),
	busy: state.activityIndicators.uploadingImage || state.activityIndicators.postingPhoto,
	listPath: `/photo_contest/${window.checksum}/`,
})

const mapDispatchToProps = dispatch => ({
	handleSubmit: e => {
		e.preventDefault()
		dispatch(uploadPhoto())
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadContainer)
