import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Image from 'canvas/catalog/components/Image'

const Product = ({ 
	thumbnail,
	permalink,
	title,
	subtitle,
	price,
}) => (
	<div className="col-xs-12 col-sm-6 col-md-3">
		<Link to={permalink} className="thumbnail">
			<img src={thumbnail} alt={title} />
			<div className="caption">
				<h3>{title}</h3>
				<p>{subtitle}</p>
				<p>{price}</p>
			</div>
		</Link>
	</div>
)

Product.propTypes = {
	permalink: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	price: PropTypes.string,
}


export default Product