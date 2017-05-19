import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import _ from 'lodash'
import update from 'react-addons-update'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

const SimpleModal = ({ children, show, handleClose, title, subtitle, thumbnail }) => (
	<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
			<Modal.Title>{title}</Modal.Title>
			<p><small>{subtitle ? subtitle.substring(0,50) : null}</small></p>
		</Modal.Header>
		<Modal.Body>
			{children}
		</Modal.Body>
	</Modal>
)

export default SimpleModal