import React, { PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ModuleGrid from 'containers/ModuleGrid'
import PageGrid from 'containers/PageGrid'
import AppCreateForm from 'containers/AppCreateForm'

const AppCreateModal = ({ show, step, handleClose }) => (
	<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
			<Modal.Title>
				{step == 1 ? 'Pick an app' : null}
				{step == 2 ? 'Select a Page' : null}
				{step == 3 ? 'Name your app' : null}
			</Modal.Title>
		</Modal.Header>

		<Modal.Body>
			{step == 1 ? <ModuleGrid /> : null}
			{step == 2 ? <PageGrid /> : null}
			{step == 3 ? <AppCreateForm /> : null}
		</Modal.Body>
	</Modal>
)

export default AppCreateModal