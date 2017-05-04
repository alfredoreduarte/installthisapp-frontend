import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import _ from 'lodash'
import update from 'react-addons-update'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { getFilteredMedia } from 'modules/catalog/selectors/media'
import { postNewQuestion, postNewProductWithReduxForm } from 'modules/catalog/actions/products'
import MediaList from 'modules/catalog/components/MediaList'

const ImagePicker = ({ fields, meta: { touched, error }, show, close, media, createMedium }) => (
	<Modal show={show} onHide={close}>
		<Modal.Header closeButton>
			<Modal.Title>Image Picker</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<MediaList 
				media={media} 
				createMedium={createMedium} 
				handleDelete={() => console.log('delete')}
				onImageSelect={id => fields.push(id)}
			 />
		</Modal.Body>
		<Modal.Footer>
			<Button 
				className="btn btn-lg btn-success" 
				>
				Set Image
			</Button>
		</Modal.Footer>
	</Modal>
)

const mapStateToProps = (state, props) => {
	return {
		media: getFilteredMedia(state)
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagePicker)