import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { handleImageUploads } from 'modules/form/actions/images'
import MdClose from 'react-icons/lib/md/close'
import Dropzone from 'react-dropzone'

const ImageUploader = ({ handleChange, name, input: { value, onChange }, meta: { error, submitFailed } }) =>
<div>
	{submitFailed && error && <p className="text-danger">{error}</p>}
	<div style={{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
	}}>
		<img src={value} style={{width: '100px', height: '50px'}} />
		<Dropzone maxSize={2048000} onDrop={handleChange} multiple={false} accept="image/*" style={{
			height: '50px',
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
				Drop your image here or click to select one
			</div>
		</Dropzone>
	</div>
</div>

const mapStateToProps = state => ({ 
	
})

const mapDispatchToProps = (dispatch, props) => {
	console.log('los props')
	console.log(props)
	const { onChange } = props.input
	return {
		handleChange: (acceptedFiles, rejectedFiles) => {
			return dispatch(handleImageUploads(acceptedFiles[0])).then(url => {
				console.log('hey!')
				console.log(url)
				onChange(url)
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader)