import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Card = ({ 
	attachmentUrl,
}) => (
	<div style={{
		width: '200px',
		height: '200px',
		borderRadius: '5px',
		margin: '20px',
		backgroundImage: `url("${attachmentUrl}")`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		cursor: 'pointer',
	}}>

	</div>
)

Card.propTypes = {
	attachmentUrl: PropTypes.string,
}

export default Card