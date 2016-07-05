import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { setNewAppTitle } from 'actions/newApp'

const AppCreateForm = ({ handleSubmit, handleTextChange }) => (
	<div className="container-fluid">
		<label>Título de la app</label>
		<input 
			type="text" 
			className="form-control" 
			onChange={e => handleTextChange(e.target.value)} />
		<button className="btn btn-success" onClick={handleSubmit}>Guardar</button>
	</div>
)

const mapDispatchToProps = (dispatch, props) => ({
	handleTextChange: text => {
		dispatch(setNewAppTitle(text))
	},
	handleSubmit: () => {
		dispatch(push('/'))	
	}
})

export default connect(undefined, mapDispatchToProps)(AppCreateForm)