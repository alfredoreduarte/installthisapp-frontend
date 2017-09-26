import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import FaClose from 'react-icons/lib/fa/close'
import FaEdit from 'react-icons/lib/fa/edit'

const Source = ({ 
	id,
	fbPageName,
	fbFormName,
	fbFormId,
	destinationsAmount,
	handleDelete,
	sendTest,
	handleEdit,
	handleAddDestination,
}) => 
<li className="list-group-item">
	<FaClose 
		size="16" 
		className="text-danger pull-right" 
		style={{cursor: 'pointer'}} 
		onClick={() => {
			if (confirm('Are you sure?')){
				handleDelete(id)
			}
		}} 
	/>
	<FaEdit 
		size="16" 
		className="text-primary pull-right" 
		style={{cursor: 'pointer'}} 
		onClick={() => handleEdit(id)} 
	/>
	{destinationsAmount ? 
		<span><b>{fbPageName}</b> <small className="text-muted">Sending to <b>{destinationsAmount}</b> destination{destinationsAmount > 1 ? 's' : null}</small></span>
	:
		<span><b>{fbPageName}</b> <small className="text-muted">Not sending data</small></span>
	}
	<br/>
	<small>
		{fbFormName ? fbFormName : `Form ID ${fbFormId}`} | <a onClick={sendTest} style={{cursor: 'pointer', textDecoration: 'underline'}}>Test</a> | 
		 <a onClick={handleAddDestination} style={{cursor: 'pointer', textDecoration: 'underline'}}>Add Destination</a>
	</small>
</li>

export default Source