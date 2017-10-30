import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import MdCloudUpload from 'react-icons/lib/md/cloud-upload'
import MdCloudDone from 'react-icons/lib/md/cloud-done'
import MdClear from 'react-icons/lib/md/clear'
import FaCamera from 'react-icons/lib/fa/camera'
import { toggleUploadingImage } from 'canvas/photo_contest/actions/activityIndicators'

class ImageUploaderField extends React.Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleImageUploads = this.handleImageUploads.bind(this)
		this.getSignedRequest = this.getSignedRequest.bind(this)
		this.makeRequest = this.makeRequest.bind(this)
		this.uploadFile = this.uploadFile.bind(this)
	}
	handleChange(acceptedFiles, rejectedFiles) {
		this.props.toggleIndicator()
		this.props.input.onChange(acceptedFiles[0].preview)
		return this.handleImageUploads(acceptedFiles[0]).then(url => {
			this.props.toggleIndicator()
			this.props.input.onChange(url)
		})
	}
	handleImageUploads(file) {
		const checksum = '6PH6F5'
		return this.getSignedRequest(file, checksum).then(url => {
			//
			// As per https://github.com/okonet/react-dropzone#word-of-caution-when-working-with-previews
			//
			window.URL.revokeObjectURL(file.preview)
			return url
		})
	}
	getSignedRequest(file, checksum) {
		const url = `/sign-s3?file-name=photo-contest-photos/${checksum}/${Date.now()}-${file.name}&file-type=${file.type}`
		return this.makeRequest('GET', url)
			.then(response => JSON.parse(response))
			.then(json => this.uploadFile(file, json.signedRequest, json.url))
			.catch(error => {
				console.error('Augh, there was an error!', error.statusText)
			})
	}
	makeRequest(method, url) {
		return new Promise((resolve, reject) => {
			var xhr = new XMLHttpRequest()
			xhr.open(method, url)
			xhr.onload = function() {
				if (this.status >= 200 && this.status < 300) {
					resolve(xhr.response)
				} else {
					reject({
						status: this.status,
						statusText: xhr.statusText,
					})
				}
			}
			xhr.onerror = function() {
				reject({
					status: this.status,
					statusText: xhr.statusText,
				})
			}
			xhr.send()
		})
	}
	uploadFile(file, signedRequest, url) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()
			xhr.open('PUT', signedRequest)
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						resolve(url)
					} else {
						reject({
							status: xhr.status,
							statusText: xhr.statusText,
						})
						alert('Could not upload file.')
					}
				}
			}
			xhr.send(file)
		})
	}
	componentDidMount() {}
	render() {
		const { input: { value, onChange }, meta: { error, submitFailed, submitting }, busy, label } = this.props
		return (
			<Dropzone
				onDrop={this.handleChange}
				multiple={false}
				accept="image/*"
				disabled={value ? true : false}
				className={`editor-dropzone-image`}
				activeClassName=""
				rejectClassName="">
				{value ? (
					<div className="editor-dropzone-image-preview">
						{busy ? <MdCloudUpload size={28} className="editor-dropzone-image-busy-indicator" /> : null}
						{!busy && value ? <MdCloudDone size={28} className="editor-dropzone-image-done-indicator" /> : null}
						<img src={value} />
					</div>
				) : (
					<span className="editor-dropzone-tip">
						<FaCamera size="40" />
						<br />
						{submitFailed && error && <p className="text-danger">{error}</p>}
						{label}
					</span>
				)}
			</Dropzone>
		)
	}
}

const mapStateToProps = state => {
	return {
		busy: state.activityIndicators.uploadingImage,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		toggleIndicator: () => dispatch(toggleUploadingImage()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploaderField)
