import React, { PropTypes } from 'react'

const Tabs = ({
	showBody,
	resetSidebar,	
}) => (
	<div className="ita-sidebar-tabs">
		<div className="ita-sidebar-tab" onClick={() => resetSidebar()}>Component</div>
		<div className="ita-sidebar-tab" onClick={() => showBody()}>Page</div>
	</div>
)

Tabs.propTypes = {
	showBody: PropTypes.func.isRequired,
	resetSidebar: PropTypes.func.isRequired,
}

export default Tabs