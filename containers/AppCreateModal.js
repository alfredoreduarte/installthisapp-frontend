import React, { PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const AppCreateModal = ({ show, step }) => (
	<Modal show={show}>
		<Modal.Header>
			<Modal.Title>Modal title</Modal.Title>
		</Modal.Header>

		<Modal.Body>
			{step == 1 ? <p>Paso uno</p> : null}
			{step == 2 ? <p>Paso dos</p> : null}
			{step == 3 ? <p>Paso tres</p> : null}
		</Modal.Body>

		<Modal.Footer>
			<LinkContainer to={{ pathname: '/' }}>
				<Button>Close</Button>
			</LinkContainer>
			<LinkContainer to={{ pathname: '/create/' + (parseInt(step) + 1) }}>
				<Button bsStyle="success">Next</Button>
			</LinkContainer>
		</Modal.Footer>
	</Modal>
)

AppCreateModal.propTypes = {
	step: PropTypes.number.isRequired
}

export default AppCreateModal