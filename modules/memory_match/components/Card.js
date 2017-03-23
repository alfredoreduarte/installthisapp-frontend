import React from 'react'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import Dropzone from 'react-dropzone'

const Card = ({
	attachmentUrl,
	handleDelete,
	status,
}) => (
	<div className="thumbnail" style={{height: '240px'}}>
		<img src={attachmentUrl} style={{
			maxHeight: '200px'
		}} />
		<div className="caption text-right">
			{status == 'uploading' ?
			<span>Uploading...</span>
			:
			<a href="javascript:void(0);" className="text-danger" onClick={handleDelete}><span className="glyphicon glyphicon-trash"></span></a>
			}
		</div>
	</div>
)

export default Card