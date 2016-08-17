import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { postDeleteApp, deleteApp } from 'actions/apps'

const AppConfiguration = ({ checksum, title, updateApp }) => (
	<form onSubmit={updateApp}>
		<div className="row">
			<div className="col-md-4">
				<h3 className="ita-page-title">Preferences <small>(coming soon)</small></h3>
			</div>
			<div className="col-md-8 text-right">
				<button
					type="submit"
					className="btn btn-primary btn-outline btn-sm">
					Save
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
								<div className="col-md-4">
									<label className="control-label">Title</label>
									<span className="help-block">Will show un on the Page Tab</span>
								</div>
								<div className="col-md-8">
									<input type="text" className="form-control" value={title} />
								</div>
							</div>
							{1 == 0 ? <div className="form-group">
								<label className="col-md-4 control-label">Facebook Page</label>
								<div className="col-md-8">
									select
								</div>
							</div>
							: null }
							<div className="form-group hide">
								<label className="col-md-4 control-label">Available Platforms</label>
								<div className="col-md-8">
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
)

const mapStateToProps = (state, props) => {
	return {
		
	}
}
const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppConfiguration)