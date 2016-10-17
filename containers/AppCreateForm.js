import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap'
import { push } from 'react-router-redux'
import { setNewAppTitle } from 'actions/newApp'
import { postNewApp } from 'actions/apps'
import { getPageForNewApp } from 'selectors/pages'
import { turnOnActivityCreatingApp } from 'actions/activityIndicators'

const AppCreateForm = ({ handleSubmit, handleTextChange, busy, moduleName, valid }) => (
	<form className="container-fluid" onSubmit={handleSubmit}>
		<Col xs={12} sm={12} md={4} mdOffset={4}>
			<FormGroup>
				<ControlLabel>App</ControlLabel>
				<p>{moduleName}</p>
			</FormGroup>
			<hr/>
			<FormGroup>
				<ControlLabel>Title</ControlLabel>
				<FormControl 
					type="text"
					autoFocus
					placeholder="My new app"
					onChange={e => handleTextChange(e.target.value)} />
			</FormGroup>
			<hr/>
			<Button 
				block
				type="submit"
				bsStyle="success"
				disabled={busy || !valid}>
					{busy ? 'Creating App...' : 'Create App'}
			</Button>
		</Col>
	</form>
)

const mapStateToProps = state => ({
	busy: state.activityIndicators.appCreation,
	valid: state.newApp.title,
	moduleName: _.capitalize(_.replace(state.newApp.module, '_', ' ')),
})

const mapDispatchToProps = (dispatch, props) => ({
	handleTextChange: text => {
		dispatch(setNewAppTitle(text))
	},
	handleSubmit: e => {
		e.preventDefault()
		dispatch(postNewApp())
		dispatch(turnOnActivityCreatingApp())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(AppCreateForm)