import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Field } from 'redux-form'

import Image from 'canvas/common-components/Image'

import ImageUploaderField from 'canvas/photo_contest/components/ImageUploaderField'

const Upload = ({ messages, images, settings, formValues: { caption, attachmentUrl }, busy, handleSubmit, listPath }) => (
	<form onSubmit={handleSubmit}>
		{settings.showHeaderImageAtUploadScreen && <Image source={images.header} />}
		<div id="topbar">
			<div className="container">
				<div id="topbar-content">
					<Link to={listPath} className="btn btn-primary" id="back-button">
						{messages.backButtonLabel}
					</Link>
					<button
						type="submit"
						disabled={caption == undefined || attachmentUrl == undefined || busy}
						className="btn btn-primary"
						id="submit-button">
						{messages.submitButtonLabel}
					</button>
				</div>
			</div>
		</div>
		<div className="container">
			<div className="col-xs-12 col-sm-6">
				<div id="upload-form">
					<div className="form-group">
						<Field name="attachmentUrl" label={messages.photoFieldLabel} component={ImageUploaderField} />
					</div>
				</div>
			</div>
			<div className="col-xs-12 col-sm-6">
				<div className="form-group">
					<label>{messages.captionFieldLabel}</label>
					<Field className="form-control" name="caption" required={true} component={'textarea'} rows="3" />
				</div>
			</div>
		</div>
		<p className="text-center" style={{ marginTop: '46px' }}>
			<a href={settings.privacyPolicyUrl} target="_blank">
				{messages.privacyPolicyLinkText}
			</a>
		</p>
		{settings.showFooterImageAtUploadScreen && <Image source={images.footer} />}
	</form>
)

Upload.propTypes = {}

export default Upload
