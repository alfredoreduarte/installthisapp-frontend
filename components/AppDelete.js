import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { destroy } from 'actions/apps'

const AppDelete = ({ checksum, handleDelete }) => (
	<div>
		<div className="row">
			<div className="col-md-4">
				<h3 className="ita-page-title">Delete App</h3>
			</div>
		</div>
		<hr />
		<div className="row">
			<div className="col-md-12">
				<p className="h4">Are you sure? This action is irreversible, please confirm that you're ok with:</p>
				<br />
				<div className="checkbox">
					<label>
						<input type="checkbox" value=""  />
						Losing all of this app's users data and stats
					</label>
				</div>
				<div className="checkbox">
					<label>
						<input type="checkbox" value="" />
						Losing all this app's content, both generated by you and its users
					</label>
				</div>
				<br />
				<p>
					<button className="btn btn-danger" onClick={() => handleDelete(checksum)}>Delete this app</button>
				</p>
			</div>
		</div>
	</div>
)

const mapStateToProps = state => {
	return {
		checksum: state.admin.currentApp,
	}
}
const mapDispatchToProps = dispatch => {
	return {
		handleDelete: checksum => dispatch(destroy(checksum))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDelete)