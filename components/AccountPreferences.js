import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { updateInfo, resendEmailConfirmation } from 'actions/admin'

let AccountPreferences = ({ handleSubmit, fetching, emailConfirmed, resendConfirmation }) => (
	<form onSubmit={handleSubmit}>
		<div className="row">
			<div className="col-md-4">
				<h3 className="ita-page-title">Preferences</h3>
			</div>
			<div className="col-md-8 text-right">
				<button 
					type="submit"
					className="btn btn-sm btn-primary btn-outline" disabled={fetching}>
					{fetching ? 'Saving...' : 'Save'}
				</button>
			</div>
		</div>
		<hr />
		<div className="row">
			<div className="col-md-6">
				<div className="panel panel-default">
					<div className="panel-body">
						<div className="form-horizontal">
							<div className="form-group">
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
							<div className="form-group">
								<div className="col-md-4">
									<label className="control-label">Email</label>
								</div>
								<div className="col-md-8">
									<Field
										name="email"
										type="email" 
										className="form-control" 
										component="input" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{!emailConfirmed ? 
				<div className="col-md-6">
					<div className="panel panel-danger">
						<div className="panel-heading text-center">
							<h3 className="panel-title">Your account has not been verified</h3>
						</div>
						<div className="panel-body text-center">
							<p>{fetching ? <span>Please wait...</span> : <button type="button" className="btn btn-danger" onClick={resendConfirmation}>Resend confirmation email</button>}</p>
						</div>
					</div>
				</div>
			:
			null
			}
		</div>
	</form>
)

AccountPreferences = reduxForm({
	form: 'adminUserProfile',
})(AccountPreferences)

const mapStateToProps = state => ({
	emailConfirmed: state.admin.confirmedAt,
	fetching: state.activityIndicators.updatingAdmin,
	initialValues: state.admin,
})

const mapDispatchToProps = dispatch => {
	return { 
		handleSubmit: e => {
			e.preventDefault()
			dispatch(updateInfo())
		},
		resendConfirmation: e => {
			dispatch(resendEmailConfirmation())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPreferences)