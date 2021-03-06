import React from 'react'
import Medium from 'modules/catalog/components/Medium'

const ImagePicker = ({ galleryMediaIds, media, onDelete, fields, meta: { touched, error } }) => (
	<div className="row">
		{media.map(({ id, attachmentUrl, status }) => 
			<div key={id} className="col-md-3">
				<Medium
					selected={galleryMediaIds.indexOf(id) !== -1}
					attachmentUrl={attachmentUrl}
					handleDelete={() => onDelete(id)}
					status={status}
					handleClick={() => {
						if (galleryMediaIds.indexOf(id) !== -1) {
							fields.remove(galleryMediaIds.indexOf(id))
						}
						else{
							fields.push(id)
						}
					}}
				/>
			</div>
		)}
	</div>
)

export default ImagePicker