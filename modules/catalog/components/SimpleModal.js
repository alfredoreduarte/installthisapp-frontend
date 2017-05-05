import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import _ from 'lodash'
import update from 'react-addons-update'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { postNewQuestion, postNewProductWithReduxForm } from 'modules/catalog/actions/products'

const SimpleModal = ({ children, show, handleClose, title }) => (
	<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
			<Modal.Title>{title}</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			{children}
		</Modal.Body>
	</Modal>
)

const mapStateToProps = (state, props) => {
	return {
		
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		// close: () => browserHistory.push(props.closeUrl),
		// handleSubmit: () => dispatch(postNewProductWithReduxForm()).then(() => browserHistory.push(props.closeUrl)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleModal)