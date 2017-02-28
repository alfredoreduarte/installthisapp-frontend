import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const Integrations = ({
	type,
	checksum,
}) => (
	<div>
		<div className="row">
			<div className="col-md-12">
				<h3 className="ita-page-title">Integrations</h3>
			</div>
		</div>
		<hr />
		<div className="col-md-4">
			<Link to={`/d/apps/${type}/${checksum}/integrations/facebook`} activeClassName="active">
				<img src="/images/facebook-logo.png" className="img-responsive" />
			</Link>
		</div>
	</div>
)

const mapStateToProps = (state, ownProps) => ({
	checksum: ownProps.params.checksum,
	type: ownProps.params.type,
})

const mapDispatchToProps = dispatch => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(Integrations)