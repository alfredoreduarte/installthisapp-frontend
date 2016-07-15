import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import MouseTrap from 'components/design-helper/MouseTrap'
import { updateCoords, updateSelector } from 'actions/design-helper/mouseTrap'
import { setActiveSelector, handleHover } from 'actions/styles'
import GameSample from 'components/GameSample'

const DesignHelper = ({ coords, handleHover, handleClick }) => (
	<div>
		<MouseTrap 
			pos={coords} 
			handleClick={() => handleClick()}
		/>
		<div className="actualGame" onMouseOver={handleHover}>
			<GameSample />
		</div>
	</div>
)

const mapStateToProps = (state, props) => {
	return { 
		coords: state.mouseTrap
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		handleHover: e => dispatch(handleHover(e)),
		handleClick: () => dispatch(setActiveSelector())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignHelper)