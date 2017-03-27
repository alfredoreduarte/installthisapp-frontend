import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Card = ({ 
	cardBack,
	attachmentUrl,
}) => (
	<div style={{
		width: '20%',
		height: '200px',
		borderRadius: '5px',
		margin: '2.5% 20px',
		cursor: 'pointer',
		// 
		perspective: 600,

	}}>
		<div style={{
			backgroundImage: `url(${cardBack})`,
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backfaceVisibility: 'hidden',
		}}></div>
		<div style={{
			backgroundImage: `url(${attachmentUrl})`,
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
		}}></div>
	</div>
)

Card.propTypes = {
	attachmentUrl: PropTypes.string,
}

export default Card