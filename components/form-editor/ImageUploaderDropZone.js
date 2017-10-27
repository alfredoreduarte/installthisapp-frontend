import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { handleImageUploads } from 'modules/form/actions/images'
import { setBusyImageUploader } from 'actions/formEditorUI'
import Dropzone from 'react-dropzone'
import MdCloudUpload from 'react-icons/lib/md/cloud-upload'
import MdClear from 'react-icons/lib/md/clear'

const ImageUploader = ({
	handleChange,
	recommendedDimensions,
	busyName,
	name,
	input: { value, onChange },
	meta: { error, submitFailed, submitting },
}) => (
	<Dropzone
		onDrop={handleChange}
		multiple={false}
		accept="image/*"
		disabled={value ? true : false}
		className={`editor-dropzone-image`}
		activeClassName=""
		rejectClassName="">
		{value ? (
			<div className="editor-dropzone-image-preview">
				{busyName == name ? (
					<MdCloudUpload size={20} className="editor-dropzone-image-busy-indicator" />
				) : (
					<MdClear size={20} className="editor-dropzone-image-remove" onClick={() => onChange(null)} />
				)}
				<img src={value} />
			</div>
		) : (
			<span className="editor-dropzone-tip">
				{submitFailed && error && <p className="text-danger">{error}</p>}
				Drop an image here or click to browse. {recommendedDimensions && `Recommended size: ${recommendedDimensions}px`}
			</span>
		)}
	</Dropzone>
)

const mapStateToProps = state => ({
	busyName: state.formEditorUI.submittingImageWithFieldName,
})

const mapDispatchToProps = (dispatch, props) => {
	const { onChange, name } = props.input
	return {
		handleChange: (acceptedFiles, rejectedFiles) => {
			onChange(acceptedFiles[0].preview)
			dispatch(setBusyImageUploader(name))
			return dispatch(handleImageUploads(acceptedFiles[0])).then(url => {
				onChange(url)
				dispatch(setBusyImageUploader(null))
			})
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader)
