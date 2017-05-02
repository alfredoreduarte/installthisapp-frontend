import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import _ from 'lodash'
import update from 'react-addons-update'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { postNewQuestion, postNewProductWithReduxForm } from 'modules/catalog/actions/products'
import ProductCreator from 'modules/catalog/components/ProductCreator'

const ProductsCreate = ({show, close, handleSubmit, initialProduct }) => (
	<Modal show={show} onHide={close}>
		<Modal.Header closeButton>
			<Modal.Title>New Product</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<ProductCreator initialProduct={initialProduct} />
		</Modal.Body>
		<Modal.Footer>
			<Button 
				className="btn btn-lg btn-success" 
				onClick={handleSubmit}>
				Save Product
			</Button>
		</Modal.Footer>
	</Modal>
)

const mapStateToProps = (state, props) => {
	return {
		
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		close: () => browserHistory.push(props.closeUrl),
		handleSubmit: () => dispatch(postNewProductWithReduxForm()).then(() => browserHistory.push(props.closeUrl)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsCreate)