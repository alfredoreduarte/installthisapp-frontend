import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { push } from 'react-router-redux'
import Select from 'react-select'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { postToApi } from 'api'
import { update } from 'actions/apps'
import { getCurrentApp } from 'selectors/apps'

const FacebookPageField = () => (
	<Select
		searchable={true}
		autosize={false}
		clearable={false}
		name="form-field-name"
		value={'name'}
		options={[
			{ value: 'name', label: 'Alphabetically' },
			{ value: 'createdAt', label: 'Most Recent' }
		]}
		onChange={val => console.log(val)}
	/>
)

let AppConfiguration = ({ handleSubmit, fetching }) => (
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
									<label className="control-label">Title</label>
									<span className="help-block">Will show un on the Page Tab</span>
								</div>
								<div className="col-md-8">
									<Field
										name="title"
										type="text" 
										className="form-control" 
										component="input" />
								</div>
							</div>
							<div className="form-group hide">
								<label className="col-md-4 control-label">Facebook Page</label>
								<div className="col-md-8">
									<Field name="facebookPageId" component={FacebookPageField}/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
)

AppConfiguration = reduxForm({
	form: 'appPreferences',
})(AppConfiguration)

const mapStateToProps = (state, ownProps) => {
	return {
		fetching: state.activityIndicators.updatingApp,
		initialValues: ownProps.currentApp
	}
}

const mapDispatchToProps = dispatch => {
	return { 
		handleSubmit: e => {
			e.preventDefault()
			dispatch(update())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppConfiguration)