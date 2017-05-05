import React from 'react'
import Medium from 'modules/catalog/components/Medium'

const SimpleImagePicker = ({ media, onDelete, input: { value, onChange } }) => (
	<div>
		{media.map(({ id, attachmentUrl, status }) => 
			<Medium
				key={id}
				attachmentUrl={attachmentUrl}
				handleDelete={() => onDelete(id)}
				status={status}
				handleClick={() => onChange(id)}
			/>
		)}
	</div>
)

export default SimpleImagePicker