import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const Sidebar = ({ checksum, type }) => (
	<div></div>
)

const mapStateToProps = ( state, props ) => ({
	checksum: props.params.checksum,
	type: props.params.type,
})

export default connect(mapStateToProps)(Sidebar)