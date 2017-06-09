import React from 'react'
import Medium from 'modules/catalog/components/Medium'

const SimpleImagePicker = ({ media, onDelete, input: { value, onChange } }) => (
	<div className="row">
		{media.map(({ id, attachmentUrl, status }) => 
			<div key={id} className="col-md-3">
				<Medium
					attachmentUrl={attachmentUrl}
					handleDelete={() => {
						console.log(onDelete)
						onDelete(id)
					}}
					selected={value === id}
					status={status}
					handleClick={() => onChange(id)}
				/>
			</div>
		)}
	</div>
)

export default SimpleImagePicker