import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Card = ({ 
	cardBack,
	attachmentUrl,
	onFlip,
	flipped,
	hidden,
}) => (
	<div className={`Card ${flipped ? 'card-flipped' : null}`} onClick={onFlip} style={{visibility: hidden ? 'hidden' : 'visible'}}>
		<div className="face front" style={{
			backgroundImage: `url(${cardBack})`,
		}}></div>
		<div className="face back" style={{
			backgroundImage: `url(${attachmentUrl})`,
		}}></div>
	</div>
)

Card.propTypes = {
	attachmentUrl: PropTypes.string,
	onFlip: PropTypes.func.isRequired,
	flipped: PropTypes.bool.isRequired,
}

export default Card