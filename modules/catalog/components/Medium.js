import React from 'react'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import TiTrash from 'react-icons/lib/ti/trash'
import MdCheckBoxOutlineBlank from 'react-icons/lib/md/check-box-outline-blank'
import MdCheckBox from 'react-icons/lib/md/check-box'

const Medium = ({
	selected,
	attachmentUrl,
	handleDelete,
	status,
	handleClick = () => {},
}) => (
	<div className="thumbnail" style={{
		cursor: status == 'uploading' ? 'not-allowed' : 'default',
	}}>
		<img src={attachmentUrl} style={{
			height: '100px',
			width: 'auto',
		}} />
		
		{status === 'uploading' ?
			<div className="caption text-center"><span>Uploading...</span></div>
		:
			<div className="caption">
				{handleDelete ?
					<a href="javascript:void(0);" className="text-danger" onClick={() => {status == 'uploading' ? null : handleDelete()}}>
						<TiTrash size={20} />
					</a>
				: null}
				{selected === true ?
					<MdCheckBox size={20} className="text-primary" onClick={() => {status == 'uploading' ? null : handleClick()}} />
				: null}
				{selected === false ?
					<MdCheckBoxOutlineBlank size={20} className="text-primary" onClick={() => {status == 'uploading' ? null : handleClick()}} />
				: null}
			</div>
		}
	</div>
)

export default Medium