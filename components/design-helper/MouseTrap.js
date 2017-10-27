import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const MouseTrap = ({
	pos = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	},
	handleClick,
}) => (
	<div
		className="ita-design-editor-daemon"
		style={{
			position: 'absolute',
			zIndex: 1,
			top: `${pos.y + document.body.scrollTop}px`,
			left: `${pos.x}px`,
			width: `${pos.w}px`,
			height: `${pos.h}px`,
			backgroundColor: 'rgba(0,173,255,.4)',
		}}
		onClick={() => handleClick()}
	/>
)

const mapStateToProps = (state, props) => {
	// console.log('elscroll', document.body.scrollTop)
	return {}
}

// export default MouseTrap
export default connect(mapStateToProps)(MouseTrap)
