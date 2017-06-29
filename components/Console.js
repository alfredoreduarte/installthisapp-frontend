import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { authenticatedPost, authenticatedGet, anonGet } from 'actions/console'

let Console = ({ authenticatedPost, authenticatedGet, anonGet }) => (
	<div className="col-md-12">
		<div>
			<form className="form-inline" onSubmit={authenticatedGet}>
				<div className="form-group">
					<label>Authenticated GET</label>
				</div>
				<div className="form-group">
					<Field
						name="authenticatedGet"
						type="text" 
						className="form-control" 
						component="input" />
				</div>
				<button type="submit" className="btn btn-default">GET</button>
			</form>
			<br/>
			<form className="form-inline" onSubmit={authenticatedPost}>
				<div className="form-group">
					<label>Authenticated POST</label>
				</div>
				<div className="form-group">
					<Field
						name="authenticatedPost"
						type="text" 
						className="form-control" 
						component="input" />
				</div>
				<button type="submit" className="btn btn-default">POST</button>
			</form>
			<br/>
			<form className="form-inline" onSubmit={anonGet}>
				<div className="form-group">
					<label>Anonymous GET</label>
				</div>
				<div className="form-group">
					<Field
						name="anonGet"
						type="text" 
						className="form-control" 
						component="input" />
				</div>
				<button type="submit" className="btn btn-default">GET</button>
			</form>
		</div>
	</div>
)

Console = reduxForm({
	form: 'apiConsole',
})(Console)

const mapStateToProps = state => ({
	
})

const mapDispatchToProps = dispatch => {
	return { 
		authenticatedPost: e => {
			e.preventDefault()
			dispatch(authenticatedPost())
		},
		authenticatedGet: e => {
			e.preventDefault()
			dispatch(authenticatedGet())
		},
		anonGet: e => {
			e.preventDefault()
			dispatch(anonGet())
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Console)