import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const CategoriesList = ({ 
	categories,
	title,
}) => (
	<div>
		<h3 className="ita-cali-desktop-categories-list-title" style={{
			marginBottom: '2em',
		}}>{title}</h3>
		<ul className="list-unstyled" style={{
			marginLeft: '1em'
		}}>
			{categories.map( ({ id, name, permalink }) => <li key={id}>
				<Link to={permalink} className="ita-cali-desktop-categories-list-link">{name}</Link>
			</li>)}
		</ul>
	</div>
)

CategoriesList.propTypes = {
	categories: PropTypes.array.isRequired,
	title: PropTypes.string,
}

export default CategoriesList