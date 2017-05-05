import React from 'react'
import Medium from 'modules/catalog/components/Medium'

const ImagePicker = ({ media, onDelete, fields, meta: { touched, error } }) => (
	<div>
		{media.map(({ id, attachmentUrl, status }) => 
			<Medium
				key={id}
				attachmentUrl={attachmentUrl}
				// handleDelete={() => onDelete(id)}
				// status={status}
				handleClick={() => fields.push(id)}
			/>
		)}
	</div>
)

export default ImagePicker