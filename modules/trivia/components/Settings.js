import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { push } from 'react-router-redux'
import Select from 'react-select'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { updateAppSpecificSettings } from 'actions/apps'
import OpenGraphFormFieldsForSettingsPage from 'components/OpenGraphFormFieldsForSettingsPage'

let Settings = ({ handleSubmit, fetching, settings }) => (
	<form onSubmit={handleSubmit}>
		<div className="row">
			<div className="col-md-4">
				<h3 className="ita-page-title">Trivia preferences</h3>
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
								<div className="col-md-6">
									<label className="control-label">Time Limit</label>
								</div>
								<div className="col-md-6">
									<Field
										name={'timeLimit'}
										type="number" 
										className="form-control" 
										component="input" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-6">
				<div className="panel panel-default">
					<div className="panel-body">
						<div className="form-horizontal">
							<OpenGraphFormFieldsForSettingsPage />
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
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)