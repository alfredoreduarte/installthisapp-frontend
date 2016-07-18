import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'

const Sidebar = ({ checksum, type }) => (
	<ul className="list-unstyled">
		<li><Link to={`/apps/${type}/${checksum}/questions`} activeClassName="active">Questions</Link></li>
		<li><Link to={`/apps/${type}/${checksum}/answers`} activeClassName="active">Answers</Link></li>
	</ul>
)

const mapStateToProps = (state, props) => {
	return {
		checksum: props.params.checksum,
		type: props.params.type
	}
}

export default connect(mapStateToProps)(Sidebar)