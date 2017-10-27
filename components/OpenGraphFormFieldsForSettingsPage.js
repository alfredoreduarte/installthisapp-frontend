import React from 'react'
import { Field, FieldArray } from 'redux-form'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

let OpenGraphFormFieldsForSettingsPage = props => (
	<div>
		<h4 className="text-center">
			<u>Facebook feed metadata</u>
		</h4>
		<div className="form-group">
			<label className="col-sm-2 control-label">Title</label>
			<div className="col-sm-10">
				<Field
					className="form-control"
					name={'openGraphTitle'}
					component="input"
					type="text"
					placeholder={'Title for posts shared on Facebook'}
				/>
			</div>
		</div>
		<div className="form-group">
			<label className="col-sm-2 control-label">Description</label>
			<div className="col-sm-10">
				<Field
					className="form-control"
					name={'openGraphDescription'}
					component="textarea"
					rows="3"
					placeholder={'Title for posts shared on Facebook'}
				/>
				<p className="help-block">Usually between 2 and 4 sentences.</p>
			</div>
		</div>
		<div className="form-group">
			<label className="col-sm-2 control-label">Thumbnail</label>
			<div className="col-sm-10">
				<Field name={'openGraphImage'} recommendedDimensions="600 x 315" component={ImageUploaderDropZone} />
				<p className="help-block">
					Use images that are at least 1200 x 630 pixels for the best display on high resolution devices.<br />
					At the minimum, you should use images that are 600 x 315 pixels to display link page posts with larger images.<br />
					<a href="https://developers.facebook.com/docs/sharing/best-practices#images" target="_blank">
						View Facebook's guide
					</a>.
				</p>
			</div>
		</div>
		<p>
			Remember to{' '}
			<a href="http://help.installthisapp.com/common-issues/refreshing-facebooks-shared-links-cache" target="_blank">
				clear Facebook's cache
			</a>
			each time you edit any of the previous fields, or you won't see the changes reflected.
		</p>
	</div>
)

export default OpenGraphFormFieldsForSettingsPage
