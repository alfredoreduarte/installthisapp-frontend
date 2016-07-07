import React, { PropTypes } from 'react'

const DesignEditorSidebarTabs = ({
	handleTabs	
}) => (
	<div className="ita-sidebar-tabs">
		<div className="ita-sidebar-tab" onClick={() => handleTabs('elem')}>Component</div>
		<div className="ita-sidebar-tab" onClick={() => handleTabs('doc')}>Page</div>
	</div>
)

DesignEditorSidebarTabs.propTypes = {
	handleTabs: PropTypes.func.isRequired,
}

export default DesignEditorSidebarTabs