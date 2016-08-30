import React, { PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { LinkContainer } from 'react-router-bootstrap'
import ModuleGrid from 'containers/ModuleGrid'
import PageGrid from 'containers/PageGrid'
import AppCreateForm from 'containers/AppCreateForm'

const AppCreateModal = ({ show, step, handleClose, back }) => (
	<Modal 
		show={show} 
		backdrop="static"
		onHide={handleClose} 
		bsClass="modal" 
		className="ita-modal-fullscreen ita-app-creation-wizard">
		<Modal.Header closeButton={false}>
			<Modal.Title className="h2">
				<a onClick={step > 1 ? back : handleClose} className="btn ita-modal-back">
					<span className="h2">
						<span className={`glyphicon glyphicon-${step > 1 ? 'arrow-left' : 'remove'}`}></span>
					</span>
				</a>
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

const mapDispatchToProps = (dispatch, props) => ({
	back: () => dispatch(goBack())
})

export default connect(undefined, mapDispatchToProps)(AppCreateModal)