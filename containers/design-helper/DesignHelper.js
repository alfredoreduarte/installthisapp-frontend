import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import MouseTrap from 'components/design-helper/MouseTrap'
import { setActiveSelector, setActiveEditedContent, handleHover, resetMouseTrap } from 'actions/styles'
import GameSample from 'components/GameSample'

const DesignHelper = ({ previews, messages, images, coords, handleHover, handleMouseOut, handleClick }) => (
	<div>
		<MouseTrap pos={coords} handleClick={handleClick} />
		<div onMouseOver={handleHover}>
			<GameSample previews={previews} messages={messages} images={images} />
		</div>
	</div>
)

const mapStateToProps = state => ({
	coords: state.mouseTrap,
	messages: state.styles.messages,
	images: state.styles.images,
})

const mapDispatchToProps = dispatch => ({
	handleHover: e => dispatch(handleHover(e)),
	handleMouseOut: e => dispatch(resetMouseTrap(e)),
	handleClick: e => {
		dispatch(setActiveEditedContent())
		dispatch(setActiveSelector())
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(DesignHelper)