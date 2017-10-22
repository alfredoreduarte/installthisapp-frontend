import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form'
import { updateInfo } from 'actions/admin'

let AccountComplete = ({ handleSubmit, fetching }) => (
	<form onSubmit={handleSubmit}>
		<div className="row">
			<div className="col-md-4 col-md-offset-4" style={{marginTop: '60px'}}>
				<p className="text-center"><img src="/images/logo.jpg" className="img-rounded" style={{width: "50px"}} /></p>
				<br/>
				<br/>
				<h2 className="text-center"><b>Complete your profile</b></h2>
				<br/>
				<div className="panel panel-default">
					<div className="panel-body">
						<div className="form-horizontal">
							<div className="form-group form-group-lg">
								<div className="col-md-4">
									<label className="control-label">Full Name</label>
								</div>
								<div className="col-md-8">
									<Field
										name="name"
										type="text" 
										className="form-control" 
										component="input" />
								</div>
							</div>
						</div>
					</div>
					<div className="panel-footer">
						<button type="submit" className="btn btn-lg btn-success btn-block" disabled={fetching}><b>{fetching ? 'Saving...' : 'Save and continue →'}</b></button>
					</div>
				</div>
			</div>
		</div>
	</form>
)

AccountComplete = reduxForm({
	form: 'adminUserProfile',
})(AccountComplete)

const mapStateToProps = state => ({
	fetching: state.activityIndicators.updatingAdmin,
	initialValues: state.admin,
})

const mapDispatchToProps = (dispatch, props) => {
	const redirectUri = props.location.query.redirect_uri || window.location.protocol + '//' + window.location.hostname + '/d'
	return { 
		handleSubmit: e => {
			e.preventDefault()
			// dispatch(updateInfo())
			dispatch(updateInfo()).then(res => {
				dispatch(push('/d'))
				// top.location.href = redirectUri
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountComplete)