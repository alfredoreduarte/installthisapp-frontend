import React from 'react'
import { Link } from 'react-router'

const SummarySquare = ({ icon, link, variant, label }) => (
	<Link to={link} className={`summary-square summary-square--${variant}`}>
		{icon}
		{label}
	</Link>
)

export default SummarySquare
