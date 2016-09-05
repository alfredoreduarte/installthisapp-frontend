import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import MouseTrap from 'components/design-helper/MouseTrap'
import { setActiveSelector, handleHover, resetMouseTrap } from 'actions/styles'
import GameSample from 'components/GameSample'

const DesignHelper = ({ coords, handleHover, handleMouseOut, handleClick }) => (
	<div>
		<MouseTrap pos={coords} handleClick={handleClick} />
		<div onMouseOver={handleHover}>
			<GameSample />
		</div>
	</div>
)

const mapStateToProps = state => ({
	coords: state.mouseTrap,
})

const mapDispatchToProps = dispatch => ({
	handleHover: e => dispatch(handleHover(e)),
	handleMouseOut: e => dispatch(resetMouseTrap(e)),
	handleClick: e => dispatch(setActiveSelector()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DesignHelper)