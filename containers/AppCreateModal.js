import React, { PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ModuleGrid from 'containers/ModuleGrid'
import PageGrid from 'containers/PageGrid'
import AppCreateForm from 'containers/AppCreateForm'

const AppCreateModal = ({ show, step }) => (
	<Modal show={show}>
		<Modal.Header>
			<Modal.Title>Modal title</Modal.Title>
		</Modal.Header>

		<Modal.Body>
			{step == 1 ? <ModuleGrid /> : null}
			{step == 2 ? <PageGrid /> : null}
			{step == 3 ? <AppCreateForm /> : null}
		</Modal.Body>

		<Modal.Footer>
			<LinkContainer to={{ pathname: '/' }}>
				<Button>Close</Button>
			</LinkContainer>
			<LinkContainer to={{ pathname: '/apps/create/' + (parseInt(step) + 1) }}>
				<Button bsStyle="success">Next</Button>
			</LinkContainer>
		</Modal.Footer>
	</Modal>
)

AppCreateModal.propTypes = {
	// step: PropTypes.number.isRequired
}

export default AppCreateModal