import React, { PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { LinkContainer } from 'react-router-bootstrap'
import ModuleGrid from 'containers/ModuleGrid'
import PageGrid from 'containers/PageGrid'
import AppCreateForm from 'containers/AppCreateForm'

const AppCreateModal = ({ show, step, handleClose, back, whoopsAlert }) => (
	<Modal show={show} backdrop="static" onHide={handleClose} bsClass="modal" className="ita-modal-fullscreen ita-app-creation-wizard">
		<Modal.Header closeButton={false}>
			<Modal.Title className="h2">
				<a onClick={step > 1 ? back : handleClose} className="btn ita-modal-back">
					<span className="h2">
						<span className={`glyphicon glyphicon-${step > 1 ? 'arrow-left' : 'remove'}`} />
					</span>
				</a>
				{step == 1 ? 'Pick an app' : null}
				{step == 3 ? 'Name your app' : null}
			</Modal.Title>
		</Modal.Header>

		<Modal.Body>
			{whoopsAlert && step == 1 ? (
				<div className="alert alert-warning">
					Whoops! That app is not quite ready yet, but we're going to speed up development based on your preference. Our
					currently available apps are: <b>Top Fans</b>.
				</div>
			) : null}
			{step == 1 ? <ModuleGrid /> : null}
			{step == 3 ? <AppCreateForm /> : null}
		</Modal.Body>
	</Modal>
)

const mapStateToProps = (state, props) => ({
	whoopsAlert: state.newApp.whoopsAlert,
})

const mapDispatchToProps = (dispatch, props) => ({
	back: () => dispatch(goBack()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppCreateModal)
