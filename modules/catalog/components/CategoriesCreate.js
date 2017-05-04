import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import _ from 'lodash'
import update from 'react-addons-update'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { postNewCategoryWithReduxForm } from 'modules/catalog/actions/categories'
import CategoryCreator from 'modules/catalog/components/CategoryCreator'

const CategoriesCreate = ({show, close, handleSubmit, categories, initialCategory }) => (
	<Modal show={show} onHide={close}>
		<Modal.Header closeButton>
			<Modal.Title>New Category</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<CategoryCreator categories={categories} initialCategory={initialCategory} />
		</Modal.Body>
		<Modal.Footer>
			<Button 
				className="btn btn-lg btn-success" 
				onClick={handleSubmit}>
				Save Category
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
		handleSubmit: () => dispatch(postNewCategoryWithReduxForm()).then(() => browserHistory.push(props.closeUrl)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesCreate)