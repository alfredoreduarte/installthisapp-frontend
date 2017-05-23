import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const CategoriesList = ({ 
	categories,
	title,
}) => (
	<div>
		<h3 style={{
			marginBottom: '2em',
			// design
			lineHeight: 1.5,
			textAlign: 'left',
			color: '#5A6471',
			letterSpacing: '0px',
			fontSize: '11px',
			fontFamily: 'Montserrat',
			fontWeight: 'bold',
			fontStyle: 'normal',
			textDecoration: 'none',
			textTransform: 'uppercase',
		}}>{title}</h3>
		<ul className="list-unstyled" style={{
			marginLeft: '1em'
		}}>
			{categories.map( ({ id, name, permalink }) => <li key={id}><Link to={permalink} style={{
				// design
				lineHeight: 2.5,
				textAlign: 'left',
				color: '#5A6471',
				letterSpacing: '0px',
				fontSize: '12px',
				fontFamily: 'Montserrat',
				fontWeight: '300',
				fontStyle: 'normal',
				textDecoration: 'none',
				textTransform: 'none',
			}}>{name}</Link></li>)}
		</ul>
	</div>
)

CategoriesList.propTypes = {
	categories: PropTypes.array.isRequired,
	title: PropTypes.string,
}

export default CategoriesList