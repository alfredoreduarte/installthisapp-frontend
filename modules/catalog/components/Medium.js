import React from 'react'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import Dropzone from 'react-dropzone'

const Medium = ({
	attachmentUrl,
	handleDelete,
	status,
	handleClick,
}) => (
	<div className="thumbnail">
		<img src={attachmentUrl} onClick={handleClick} style={{
			maxHeight: '200px'
		}} />
		
		{status == 'uploading' ?
			<div className="caption text-right"><span>Uploading...</span></div>
		: null}

		{handleDelete ?
			<div className="caption text-right">
				<a href="javascript:void(0);" className="text-danger" onClick={handleDelete}>
					<span className="glyphicon glyphicon-trash"></span>
				</a>
			</div>
		: null}
	</div>
)

export default Medium