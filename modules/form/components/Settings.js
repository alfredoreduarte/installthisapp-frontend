import React, { Component } from 'react'
import _ from 'lodash'
import { push } from 'react-router-redux'
import Select from 'react-select'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { updateAppSpecificSettings } from 'actions/apps'

let Settings = ({ handleSubmit, fetching, settings }) => (
	<form onSubmit={handleSubmit}>
		<div className="row">
			<div className="col-md-4">
				<h3 className="ita-page-title">App preferences</h3>
			</div>
			<div className="col-md-8 text-right">
				<button type="submit" className="btn btn-sm btn-primary btn-outline" disabled={fetching}>
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
								<div className="col-md-6">
									<label className="control-label">Comma-separated Email recipients for notifications</label>
								</div>
								<div className="col-md-6">
									<Field name={'emailRecipients'} className="form-control" rows={3} component="textarea" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
)

Settings = reduxForm({
	form: 'appSpecificSettings',
})(Settings)

const mapStateToProps = (state, ownProps) => {
	return {
		fetching: state.activityIndicators.updatingApp,
		initialValues: ownProps.currentApp.setting,
		settings: _.keys(ownProps.currentApp.setting),
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleSubmit: e => {
			e.preventDefault()
			dispatch(updateAppSpecificSettings())
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
