import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'

const Sidebar = ({ checksum, type }) => (
	<ul className="list-unstyled">
		<li><Link to={`/d/apps/${type}/${checksum}/photos`} activeClassName="active">Photos</Link></li>
	</ul>
)

const mapStateToProps = (state, props) => {
	return {
		checksum: props.params.checksum,
		type: props.params.type
	}
}

export default connect(mapStateToProps)(Sidebar)