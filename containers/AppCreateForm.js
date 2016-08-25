import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { setNewAppTitle } from 'actions/newApp'
import { postNewApp } from 'actions/apps'
import { turnOnActivityCreatingApp } from 'actions/activityIndicators'

const AppCreateForm = ({ handleSubmit, handleTextChange, busy }) => (
	<div className="container-fluid">
		<label>Title</label>
		<input 
			type="text" 
			className="form-control" 
			onChange={e => handleTextChange(e.target.value)} />
		<button className="btn btn-success" onClick={handleSubmit} disabled={busy}>{busy ? 'Creating...' : 'Create'}</button>
	</div>
)

const mapStateToProps = state => ({
	busy: state.activityIndicators.appCreation
})

const mapDispatchToProps = (dispatch, props) => ({
	handleTextChange: text => {
		dispatch(setNewAppTitle(text))
	},
	handleSubmit: () => {
		dispatch(postNewApp())
		dispatch(turnOnActivityCreatingApp())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(AppCreateForm)