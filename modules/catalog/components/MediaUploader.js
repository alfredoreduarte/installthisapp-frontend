import React from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { createMedium } from 'modules/catalog/actions/media'

const MediaUploader = ({
	onChange,
	multiple = true,
}) => (
	<Dropzone maxSize={2048000} onDrop={onChange} multiple={multiple} accept="image/*" style={{
		height: '140px',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		border: '2px dashed #0D9EFF',
		padding: '20px',
	}}>
		<div>
			<p>Try dropping some files here, or click to select files to upload.</p>
			<p><small>400x400px</small></p>
			<p><small>Max. size: 1MB</small></p>
		</div>
	</Dropzone>
)

const mapStateToProps = state => ({ 
	
})

const mapDispatchToProps = (dispatch, props) => ({
	onChange: (acceptedFiles, rejectedFiles) => dispatch(createMedium(acceptedFiles))
})

export default connect(mapStateToProps, mapDispatchToProps)(MediaUploader)