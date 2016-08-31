import React, { PropTypes } from 'react'

const Tabs = ({
	handleTabs	
}) => (
	<div className="ita-sidebar-tabs hide">
		<div className="ita-sidebar-tab" onClick={() => handleTabs('elem')}>Component</div>
		<div className="ita-sidebar-tab" onClick={() => handleTabs('doc')}>Page</div>
	</div>
)

Tabs.propTypes = {
	handleTabs: PropTypes.func.isRequired,
}

export default Tabs