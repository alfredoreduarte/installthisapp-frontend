import React from 'react'
import { Modal } from 'react-bootstrap'

const SimpleModal = ({ children, show, handleClose, title, bsSize }) => 
	<Modal show={show} onHide={handleClose} bsSize={bsSize}>
		<Modal.Header closeButton>
			<Modal.Title>{title}</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			{children}
		</Modal.Body>
	</Modal>

export default SimpleModal