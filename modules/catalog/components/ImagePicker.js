import React from 'react'
import Medium from 'modules/catalog/components/Medium'

const ImagePicker = ({ media, onDelete, fields, meta: { touched, error } }) => (
	<div className="row">
		{media.map(({ id, attachmentUrl, status }) => 
			<div key={id} className="col-md-6">
				<Medium
					attachmentUrl={attachmentUrl}
					// handleDelete={() => onDelete(id)}
					status={status}
					handleClick={() => fields.push(id)}
				/>
			</div>
		)}
	</div>
)

export default ImagePicker