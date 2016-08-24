import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const DesignEditorSidebarHeader = ({
	handleClose,
	handleSave,
	busy
}) => (
	<div className="ita-side-bar-header">
		<div className="ita-side-bar-content">
			<Link to="/d" className="btn btn-default" onClick={() => handleClose()}>
				<small>
					<i className="glyphicon glyphicon-step-backward"></i> Back to Dashboard
				</small>
			</Link>
			<button 
				className="btn btn-default btn-sm btn-outline btn-success" 
				onClick={() => handleSave()}>
				Save
			</button>
		</div>
		<div className={`ita-activity-bar ${busy ? 'ita-activity-bar-busy' : null}`}>
			<div className="ita-activity-bar-pivot"></div>
		</div>
	</div>
)

DesignEditorSidebarHeader.propTypes = {
	handleClose: PropTypes.func.isRequired,
	handleSave: PropTypes.func.isRequired,
	busy: PropTypes.bool
}

DesignEditorSidebarHeader.defaultProps = {
	busy: false,
}

export default DesignEditorSidebarHeader