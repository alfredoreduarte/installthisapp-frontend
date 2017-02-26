import React, { PropTypes } from 'react'

const Tabs = ({
	showBody,
	resetSidebar,
	showContentEditor,
	componentsOrBody,
}) => (
	<div className="ita-sidebar-tabs">
		<div 
			className={`ita-sidebar-tab ${componentsOrBody == 'components' ? 'active' : null}`} 
			onClick={resetSidebar}>Style</div>
		<div 
			className={`ita-sidebar-tab ${componentsOrBody == 'content' ? 'active' : null}`} 
			onClick={showContentEditor}>Content</div>
		<div 
			className={`ita-sidebar-tab ${componentsOrBody == 'body' ? 'active' : null}`} 
			onClick={showBody}>Page</div>
	</div>
)

Tabs.propTypes = {
	showBody: PropTypes.func.isRequired,
	resetSidebar: PropTypes.func.isRequired,
	showContentEditor: PropTypes.func.isRequired,
	componentsOrBody: PropTypes.string.isRequired,
}

export default Tabs