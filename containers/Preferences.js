import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const Preferences = ({ children, checksum }) => (
	<div className="">
		{React.cloneElement(children, { checksum })}
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		checksum: props.params.checksum
	}
}
export default connect(mapStateToProps)(Preferences)