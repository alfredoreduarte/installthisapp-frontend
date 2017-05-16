import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const CategoriesList = ({ 
	categories,
}) => (
	<div>
		<ul>
			{categories.map( ({ id, name, permalink }) => <li key={id}><Link to={permalink}>{name}</Link></li>)}
		</ul>
	</div>
)

CategoriesList.propTypes = {
	categories: PropTypes.array.isRequired,
}

export default CategoriesList