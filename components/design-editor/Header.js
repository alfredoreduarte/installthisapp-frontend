import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Header = ({ handleClose, handleSave, busy }) => (
	<div className="ita-side-bar-header">
		<div className="ita-side-bar-content">
			<a href="javascript:void(0)" className="" onClick={handleClose}>
				<small>
					<i className="glyphicon glyphicon-menu-left" /> Back to Dashboard
				</small>
			</a>
			<button disabled={busy} className="btn btn-default btn-sm btn-outline btn-success" onClick={() => handleSave()}>
				{busy ? 'Saving...' : 'Save'}
			</button>
		</div>
		<div className={`ita-activity-bar ${busy ? 'ita-activity-bar-busy' : null}`}>
			<div className="ita-activity-bar-pivot" />
		</div>
	</div>
)

Header.propTypes = {
	handleClose: PropTypes.func.isRequired,
	handleSave: PropTypes.func.isRequired,
	busy: PropTypes.bool,
}

Header.defaultProps = {
	busy: false,
}

export default Header
