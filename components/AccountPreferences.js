import React, { Component, PropTypes } from 'react'

const AccountPreferences = ({ user }) => (
	<div>
		<div className="row">
			<div className="col-md-4">
				<h3 className="ita-page-title">Preferences</h3>
			</div>
			<div className="col-md-8 text-right">
				<button className="btn btn-primary btn-outline btn-sm">Save</button>
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
									<label className="control-label">Email</label>
								</div>
								<div className="col-md-8">
									<input type="email" className="form-control" value={user.email} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default AccountPreferences