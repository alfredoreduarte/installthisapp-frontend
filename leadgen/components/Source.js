import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import FaClose from 'react-icons/lib/fa/close'

const Source = ({ 
	id,
	fbPageName,
	fbFormId,
	destinationsAmount,
	handleDelete,
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
	<b>{fbPageName}</b> <small className="text-muted">Sending to <b>{destinationsAmount}</b> destinations</small><br/>
	<small>Form ID {fbFormId}</small><br/>
</li>

export default Source