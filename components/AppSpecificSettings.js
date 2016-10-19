import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { push } from 'react-router-redux'
import Select from 'react-select'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { postToApi } from 'api'
import { updateAppSpecificSettings } from 'actions/apps'
import { getCurrentApp } from 'selectors/apps'

let AppSpecificSettings = ({ handleSubmit, fetching, settings }) => (
	<form onSubmit={handleSubmit}>
		<div className="row">
			<div className="col-md-4">
				<h3 className="ita-page-title">Top Fans preferences</h3>
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
			<div className="col-md-12">
				<div className="panel panel-default">
					<div className="panel-body">
						<div className="form-horizontal">
							<div className="form-group">
								<div className="col-md-6">
									<label className="control-label">Points per Like</label>
								</div>
								<div className="col-md-6">
									<Field
										name={'pointsPerLike'}
										type="number" 
										className="form-control" 
										component="input" />
								</div>
							</div>
							<div className="form-group">
								<div className="col-md-6">
									<label className="control-label">Points per Comment</label>
								</div>
								<div className="col-md-6">
									<Field
										name={'pointsPerComment'}
										type="number" 
										className="form-control" 
										component="input" />
								</div>
							</div>
							<div className="form-group">
								<div className="col-md-6">
									<label className="control-label">Ignored user IDs</label>
									<p className="help-block">Get the user's Facebook profile url from the scores list,<br/> and use the numeric part as in: fb.com/1234.<br/> Insert one comma between each value.</p>
								</div>
								<div className="col-md-6">
									<Field
										name={'ignoredUserIdentifiers'}
										type="text" 
										className="form-control" 
										component="textarea"
										rows="5" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
)

AppSpecificSettings = reduxForm({
	form: 'appSpecificSettings',
})(AppSpecificSettings)

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

export default connect(mapStateToProps, mapDispatchToProps)(AppSpecificSettings)