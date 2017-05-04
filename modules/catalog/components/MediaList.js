import React from 'react'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import Medium from 'modules/catalog/components/Medium'

const MediaList = ({
	media,
	createMedium,
	handleDelete,
	onImageSelect,
	multiple = true,
}) => (
	<div>
		{createMedium ? 
		<Dropzone maxSize={2048000} onDrop={createMedium} multiple={multiple} accept="image/*" style={{
			height: '140px',
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			textAlign: 'center',
			cursor: 'pointer',
			border: '2px dashed #0D9EFF',
			padding: '20px',
		}}>
			<div>
				<p>Try dropping some files here, or click to select files to upload.</p>
				<p><small>400x400px</small></p>
				<p><small>Max. size: 2MB</small></p>
			</div>
		</Dropzone>
		: null }
		{media.map( medium => 
			<div className="col-md-6" key={medium.id}>
				<Medium 
					handleDelete={() => handleDelete(medium.id)} 
					status={medium.status} 
					attachmentUrl={medium.attachmentUrl}
					onClick={() => onImageSelect(medium.id)}
				 />
			</div>
		)}
	</div>
)

export default MediaList