import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Card = ({ 
	cardBack,
	attachmentUrl,
	onFlip,
	flipped,
	hidden,
}) => (
	<div className={`Card ${flipped ? 'card-flipped' : ''}`} onClick={() => flipped ? void(0) : onFlip()} style={{visibility: hidden ? 'hidden' : 'visible'}}>
		<div className="face front" style={{
			backgroundImage: `url(${cardBack})`,
		}}></div>
		<div className="face back" style={{
			backgroundImage: `url("${attachmentUrl}")`,
		}}></div>
	</div>
)

Card.propTypes = {
	cardBack: PropTypes.string.isRequired,
	attachmentUrl: PropTypes.string.isRequired,
	onFlip: PropTypes.func.isRequired,
	flipped: PropTypes.bool.isRequired,
	hidden: PropTypes.bool.isRequired,
}

export default Card