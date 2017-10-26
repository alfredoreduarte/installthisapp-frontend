import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import FaClose from 'react-icons/lib/fa/close'
import FaEdit from 'react-icons/lib/fa/edit'
import StatusIndicator from 'components/StatusIndicator'

const Destination = ({ id, destinationType, fbPageName, fbFormName, fbFormId, status, handleDelete, handleEdit }) => (
  <li className="list-group-item">
    <FaClose
      size="16"
      className="text-danger pull-right"
      style={{ cursor: 'pointer' }}
      onClick={() => {
        if (confirm('Are you sure?')) {
          handleDelete(id)
        }
      }}
    />
    <FaEdit size="16" className="text-primary pull-right" style={{ cursor: 'pointer' }} onClick={() => handleEdit(id)} />
    <b className="text-capitalize">
      <StatusIndicator active={status == 'on'} />
      {destinationType}
    </b>{' '}
    <small className="text-muted">Receiving from {fbPageName}</small>
    <br />
    <small>{fbFormName ? fbFormName : `Form ID ${fbFormId}`}</small>
  </li>
)

export default Destination
